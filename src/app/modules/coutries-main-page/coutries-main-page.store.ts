import { Coutry } from '../../shared/interfaces/coutry';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Injectable } from '@angular/core';
import {
  catchError,
  EMPTY,
  map,
  Observable,
  of,
  switchMap
} from 'rxjs';
import { CoutriesService } from '../../shared/services/coutries.service';

export interface CountriesState {
  countries: Coutry[];
  displayedCountries: Coutry[];
  isLoading: boolean;
  isError: boolean;
}
@Injectable()
export class CoutriesMainPageStore extends ComponentStore<CountriesState> {
  constructor(private coutriesService: CoutriesService) {
    super({
      countries: [],
      displayedCountries: [],
      isLoading: false,
      isError: false,
    });
  }

  readonly counties$ = this.select((state) => state.countries);
  readonly displayedCoutries$ = this.select(
    (state) => state.displayedCountries
  );

  readonly loading$ = this.select((state) => state.isLoading);

  readonly error$ = this.select((state) => state.isError);

  readonly setCoutries = this.updater((state, countries: Coutry[]) => {
    return {
      ...state,
      countries,
    };
  });

  readonly setDisplayedCoutries = this.updater(
    (state, displayedCountries: Coutry[]) => {
      return {
        ...state,
        displayedCountries,
      };
    })

  readonly setLoading = this.updater((state, isLoading: boolean) => {
    return {
      ...state,
      isLoading,
    };
  });

  readonly setError = this.updater((state, isError: boolean) => {
    return {
      ...state,
      isError,
    };
  });

  readonly getCoutries = this.effect(() => {
    return of(0).pipe(
      switchMap(() => {
        this.setLoading(true);
        return this.coutriesService.getAllCoutries().pipe(
          tapResponse(
            (coutries: Coutry[]) => {
              this.setLoading(false);
              this.setCoutries(coutries);
              this.setDisplayedCoutries(coutries);
              console.log('load')
            },
            () => {
              this.setError(true);
            }
          )
        );
      }),
      catchError(() => EMPTY)
    );
  });

  readonly filterCoutry = this.effect((filteredValue: Observable<{ searchValue:string,regionValue:string }>) => {
    return filteredValue.pipe(
      switchMap(filterObject=>{
        this.setLoading(true);
        return this.counties$.pipe(
          map((coutries)=>{
            return this.coutriesService.filterCoutries(filterObject,coutries)
          }),
          tapResponse(
            (coutries) => {
              this.setLoading(false);
              this.setDisplayedCoutries(coutries)
            },
            () => {
              this.setLoading(false);
              this.setError(false);
            }
          )
        )
      }),
      catchError(()=>EMPTY)
    )
  });

}
