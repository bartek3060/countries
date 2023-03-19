import { Component, OnDestroy, OnInit } from "@angular/core";
import { CoutriesMainPageStore } from "./coutries-main-page.store";
import { Coutry } from "../../shared/interfaces/coutry";
import { Observable, Subject, Subscription } from "rxjs";

@Component({
  selector: "app-coutries-main-page",
  templateUrl: "./coutries-main-page.component.html",
  styleUrls: ["./coutries-main-page.component.scss"],
  providers: [CoutriesMainPageStore],
})
export class CoutriesMainPageComponent implements OnInit, OnDestroy {
  private filtersObject = { searchValue: "", regionValue: "All" };
  private displayedCoutriesShouldChangeSub: Subscription | undefined;
  private displayedCoutriesShouldChange$ = new Subject<void>();

  public displayedCoutries$: Observable<Coutry[]> =
    this.store.displayedCoutries$;
  public loading$: Observable<boolean> = this.store.loading$;

  constructor(private store: CoutriesMainPageStore) {}

  ngOnInit(): void {
    this.displayedCoutriesShouldChangeSub =
      this.displayedCoutriesShouldChange$.subscribe(() => {
        this.store.filterCoutry(this.filtersObject);
      });
  }

  ngOnDestroy(): void {
    this.displayedCoutriesShouldChangeSub?.unsubscribe();
  }

  onSearch(searchedValue: string): void {
    this.filtersObject.searchValue = searchedValue;
    this.displayedCoutriesShouldChange$.next();
  }

  onRegionChange(filteredValue: string): void {
    this.filtersObject.regionValue = filteredValue;
    this.displayedCoutriesShouldChange$.next();
  }
}
