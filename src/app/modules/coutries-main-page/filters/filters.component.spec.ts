import { ComponentFixture, TestBed } from "@angular/core/testing";

import { FiltersComponent } from "./filters.component";
import { ReactiveFormsModule } from "@angular/forms";

describe("FiltersComponent", () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [FiltersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe('methods',()=>{
    it('should onSearch() method dispatch searched event',  ()=> {
      const spySearch=jest.spyOn(component.searched,'emit')
      component.searchForm.value.searchValue='test-search'

      component.onSearch()

      expect(spySearch).toHaveBeenNthCalledWith(1,'test-search')
    });

    it('should onFilter() method dispatch filtered event',  ()=> {
      const spyFilter=jest.spyOn(component.filtered,'emit')
      component.filterForm.value.filteredValue='test-filter'

      component.onFilter()

      expect(spyFilter).toHaveBeenNthCalledWith(1,'test-filter')
    });
  })
});
