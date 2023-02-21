import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coutry } from '../interfaces/coutry';
import { map, Observable } from 'rxjs';
import { CoutryDetails } from '../interfaces/coutry-details';

@Injectable({ providedIn: 'root' })
export class CoutriesService {
  constructor(public httpClient: HttpClient) {}

  getAllCoutries(): Observable<Coutry[]> {
    return this.httpClient.get<Coutry[]>(
      'https://restcountries.com/v2/all?fields=name,capital,region,population,flags'
    );
  }

  filterCoutries(
    { searchValue, regionValue }: { searchValue: string; regionValue: string },
    coutries: Coutry[]
  ): Coutry[] {
    if (!searchValue.trim() && regionValue === 'All') return coutries;

    if (searchValue.trim() && regionValue === 'All')
      return coutries.filter((coutry) =>
        coutry.name.toLowerCase().includes(searchValue.toLowerCase())
      );

    if (searchValue.trim() && regionValue !== 'All')
      return coutries.filter(
        (coutry) =>
          coutry.name.toLowerCase().includes(searchValue.toLowerCase()) &&
          coutry.region === regionValue
      );

    if (!searchValue.trim() && regionValue !== 'All')
      return coutries.filter((coutry) => coutry.region === regionValue);
    else return coutries;
  }

  getCoutryDetails(coutryName: string): Observable<CoutryDetails> {
    return this.httpClient
      .get<CoutryDetails[]>(
        `https://restcountries.com/v2/name/${coutryName}?fields=name,capital,region,population,flags,nativeName,subregion,topLevelDomain,currencies,languages,borders`
      )
      .pipe(map((coutries) => Object.assign({}, ...coutries)));
  }
}
