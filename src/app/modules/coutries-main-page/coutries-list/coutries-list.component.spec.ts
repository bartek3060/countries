import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from "@angular/core/testing";

import { CoutriesListComponent } from "./coutries-list.component";
import { Coutry } from "../../../shared/interfaces/coutry";
import { By } from "@angular/platform-browser";
import { RouterTestingModule } from "@angular/router/testing";
import { Component, Injectable, NgModule } from "@angular/core";
import { LoadingSpinnerComponent } from "../../../shared/components/loading-spinner/loading-spinner.component";
import { Router } from "@angular/router";

@NgModule()
export class FixNavigationTriggeredOutsideAngularZoneNgModule {
  constructor(_router: Router) {}
}

@Component({
  selector: "app-mock",
  template: "<div></div>",
})
class MockComponent {}
const navigateMock = jest.fn();
@Injectable()
class RouterMock {
  navigate = navigateMock;
}

const mockAllCoutries: Coutry[] = [
  {
    name: "Poland",
    capital: "Warsaw",
    region: "Europe",
    population: 35000000,
    flags: { png: "test1/url.com" },
  },
  {
    name: "Deutschland",
    capital: "Berlin",
    region: "Europe",
    population: 40000000,
    flags: { png: "test2/url.com" },
  },
  {
    name: "Egypt",
    capital: "Kair",
    region: "Africa",
    population: 10000000,
    flags: { png: "test3/url.com" },
  },
];

describe("CoutriesListComponent", () => {
  let component: CoutriesListComponent;
  let fixture: ComponentFixture<CoutriesListComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: ":coutry", component: MockComponent },
        ]),
        FixNavigationTriggeredOutsideAngularZoneNgModule,
      ],
      declarations: [CoutriesListComponent, LoadingSpinnerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CoutriesListComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should contain number of countries elements provided in input", () => {
    component.coutriesList = mockAllCoutries;
    fixture.detectChanges();

    const coutries = fixture.debugElement.queryAll(By.css(".coutries-element"));

    expect(coutries).toHaveLength(3);

    expect(coutries[0].nativeElement.innerHTML).toContain("Poland");
    expect(coutries[0].nativeElement.innerHTML).toContain("Warsaw");
    expect(coutries[0].nativeElement.innerHTML).toContain("Europe");
    expect(coutries[0].nativeElement.innerHTML).toContain("35,000,000");
    expect(coutries[0].nativeElement.innerHTML).toContain("test1/url.com");

    expect(coutries[1].nativeElement.innerHTML).toContain("Deutschland");
    expect(coutries[1].nativeElement.innerHTML).toContain("Berlin");
    expect(coutries[1].nativeElement.innerHTML).toContain("Europe");
    expect(coutries[1].nativeElement.innerHTML).toContain("40,000,000");
    expect(coutries[1].nativeElement.innerHTML).toContain("test2/url.com");

    expect(coutries[2].nativeElement.innerHTML).toContain("Egypt");
    expect(coutries[2].nativeElement.innerHTML).toContain("Kair");
    expect(coutries[2].nativeElement.innerHTML).toContain("Africa");
    expect(coutries[2].nativeElement.innerHTML).toContain("10,000,000");
    expect(coutries[2].nativeElement.innerHTML).toContain("test3/url.com");
  });

  it("should call showCoutryDetails method when click on country element", fakeAsync(() => {
    component.coutriesList = mockAllCoutries;
    jest.spyOn(component, "showCoutryDetails");
    fixture.detectChanges();

    const coutry =
      fixture.debugElement.nativeElement.querySelector(".coutries-element");
    coutry.click();
    tick();
    expect(component.showCoutryDetails).toHaveBeenCalledWith("Poland");
  }));

  describe("Loading behavior", () => {
    it("should show spinner when isLoading true", () => {
      component.isLoading = true;
      fixture.detectChanges();

      const spinner = fixture.debugElement.query(By.css("app-loading-spinner"));
      expect(spinner).toBeTruthy();
    });
    it("should show spinner when isLoading false", () => {
      const spinner = fixture.debugElement.query(By.css("app-loading-spinner"));

      expect(spinner).toBeFalsy();
    });
  });
  describe("Component Methods", () => {
    it("should showCoutryDetails() call navigate method", fakeAsync(() => {
      jest.spyOn(router, "navigate");
      component.showCoutryDetails("Poland");
      tick();
      expect(router.navigate).toHaveBeenCalledWith(["Poland"]);
    }));
  });
});
