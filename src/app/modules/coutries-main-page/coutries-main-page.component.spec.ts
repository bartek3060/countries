import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CoutriesMainPageComponent } from './coutries-main-page.component';
import { HttpClientModule } from '@angular/common/http';
import { FiltersComponent } from './filters/filters.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CoutriesListComponent } from './coutries-list/coutries-list.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { CoutriesMainPageStore } from './coutries-main-page.store';
import {of} from "rxjs";

const filtercountryMock = jest.fn();
const mockStore = {
  filterCoutry: filtercountryMock,
  setState:jest.fn(),
  displayedCoutries$:of([]),
  loading$:of(false)

};


describe("CoutriesMainPageComponent", () => {
  let component: CoutriesMainPageComponent;
  let fixture: ComponentFixture<CoutriesMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, ReactiveFormsModule],
      declarations: [
        CoutriesMainPageComponent,
        FiltersComponent,
        CoutriesListComponent,
        LoadingSpinnerComponent,
      ],
      providers: [{ provide: CoutriesMainPageStore, useValue: mockStore }],
    }).compileComponents();
    TestBed.overrideProvider(CoutriesMainPageStore,{useValue: mockStore })

    fixture = TestBed.createComponent(CoutriesMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe('methods', () => {
    it('should onSearch update filtersObject and dispatch filterCoutry() from store', () => {
      fixture.detectChanges()
      component.onSearch('test-search');

      expect(filtercountryMock).toHaveBeenNthCalledWith(1, {
        searchValue: 'test-search',
        regionValue: 'All',
      });
    });

    it('should onRegionChange update filtersObject and dispatch filterCoutry() from store', () => {
      component.onSearch('');
      component.onRegionChange('test-filter');
      fixture.detectChanges()

      expect(filtercountryMock).toHaveBeenNthCalledWith(2, {
        searchValue: '',
        regionValue: 'test-filter',
      });
    });
  });
});
