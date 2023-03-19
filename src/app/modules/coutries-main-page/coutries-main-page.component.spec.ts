import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CoutriesMainPageComponent } from "./coutries-main-page.component";
import { HttpClientModule } from "@angular/common/http";
import { FiltersComponent } from "./filters/filters.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CoutriesListComponent } from "./coutries-list/coutries-list.component";
import { LoadingSpinnerComponent } from "../../shared/components/loading-spinner/loading-spinner.component";

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
    }).compileComponents();

    fixture = TestBed.createComponent(CoutriesMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
