import { Component } from '@angular/core';
import { CoutriesMainPageStore } from './coutries-main-page.store';
import { Coutry } from '../../shared/interfaces/coutry';
import { Observable} from 'rxjs';

@Component({
  selector: 'app-coutries-main-page',
  templateUrl: './coutries-main-page.component.html',
  styleUrls: ['./coutries-main-page.component.scss'],
  providers: [CoutriesMainPageStore],
})
export class CoutriesMainPageComponent {
  private filtersObject = { searchValue: '', regionValue: 'All' };
  public displayedCoutries$: Observable<Coutry[]> =
    this.store.displayedCoutries$;
  public loading$: Observable<boolean> = this.store.loading$;

  constructor(private store: CoutriesMainPageStore) {}

  onSearch(searchedValue: string): void {
    this.filtersObject.searchValue = searchedValue;
    this.store.filterCoutry(this.filtersObject);
  }

  onRegionChange(filteredValue: string): void {
    this.filtersObject.regionValue = filteredValue;
    this.store.filterCoutry(this.filtersObject);
  }
}
