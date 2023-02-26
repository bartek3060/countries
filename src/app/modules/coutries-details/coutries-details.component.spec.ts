import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { CoutriesDetailsComponent } from './coutries-details.component';
import {ActivatedRoute, Router} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { CoutryDetails } from '../../shared/interfaces/coutry-details';
import {By} from "@angular/platform-browser";
import {CoutriesService} from "../../shared/services/coutries.service";
import {RouterTestingModule} from "@angular/router/testing";
import spyOn = jest.spyOn;

const fakeRouteParams = {
  snapshot: { testParam: 'test' },
  params: of({ 'coutry-name': 'testCoutry' }),
};

const getCoutryDetailsMock=jest.fn()
const mockCoutriesService={
  getCoutryDetails:getCoutryDetailsMock
}

const navigateMock=jest.fn()
const mockRouter={
  navigate:navigateMock
}

const countryDetailsData: CoutryDetails = {
  name: 'test-coutry',
  capital: 'test-capital',
  region: 'test-region',
  population: 9999,
  flags: { png: '12345.png' },
  nativeName: 'test',
  subregion: 'test-sub-region',
  topLevelDomain: ['pl'],
  currencies: [{ name: 'test-currience' },{ name: 'test2-currience' }],
  languages: [{ name: 'pl' }, { name: 'eng' }],
  borders: ['de'],
};

describe('CoutriesDetailsComponent', () => {
  let component: CoutriesDetailsComponent;
  let fixture: ComponentFixture<CoutriesDetailsComponent>;
  let coutriesService: CoutriesService;
  let router:Router

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, ReactiveFormsModule,RouterTestingModule],
      declarations: [CoutriesDetailsComponent, LoadingSpinnerComponent],
      providers: [{ provide: ActivatedRoute, useValue: fakeRouteParams },{provide: CoutriesService, useValue:mockCoutriesService },{provide :Router,useValue:mockRouter }],
    }).compileComponents();

    fixture = TestBed.createComponent(CoutriesDetailsComponent);
    component = fixture.componentInstance;
    coutriesService=TestBed.inject(CoutriesService)
    router=TestBed.get(RouterTestingModule)
    getCoutryDetailsMock.mockReturnValue(of(countryDetailsData))
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Coutry details template',()=>{
    it('should show coutryDetailWrapper with data provided in coutryDetails$',  ()=> {
      const coutryDetailWrapper=fixture.debugElement.query(By.css('.coutry-details__wrapper'))
      const flagImage=fixture.debugElement.query(By.css('[data-test="flag-image"]'))
      const countryName=fixture.debugElement.query(By.css('[data-test="coutry-name"]'))
      const countryNativeName=fixture.debugElement.query(By.css('[data-test="coutry-native-name"]'))
      const countryPopulation=fixture.debugElement.query(By.css('[data-test="coutry-population"]'))
      const coutryRegion=fixture.debugElement.query(By.css('[data-test="coutry-region"]'))
      const countrySubRegion=fixture.debugElement.query(By.css('[data-test="coutry-sub-region"]'))
      const countryCapital=fixture.debugElement.query(By.css('[data-test="coutry-capital"]'))
      const countryTopDomain=fixture.debugElement.query(By.css('[data-test="coutry-top-domain"]'))
      const countryCurrencies=fixture.debugElement.queryAll(By.css('[data-test="coutry-currency"]'))
      const countryLanguages=fixture.debugElement.queryAll(By.css('[data-test="coutry-language"]'))
      const countryBorders=fixture.debugElement.queryAll(By.css('[data-test="coutry-border"]'))

      component.coutryDetails$=of(countryDetailsData)
      fixture.detectChanges()

      expect(coutryDetailWrapper).toBeTruthy()

      expect(flagImage.nativeElement.src).toContain('12345.png')
      expect(countryName.nativeElement.innerHTML).toContain('test-coutry')
      expect(countryNativeName.nativeElement.innerHTML).toContain('test')
      expect(countryPopulation.nativeElement.innerHTML).toContain('9,999')
      expect(coutryRegion.nativeElement.innerHTML).toContain('test-region')
      expect(countrySubRegion.nativeElement.innerHTML).toContain('test-sub-region')
      expect(countryCapital.nativeElement.innerHTML).toContain('test-capital')
      expect(countryTopDomain.nativeElement.innerHTML).toContain('pl')

      expect(countryCurrencies).toHaveLength(2)
      expect(countryCurrencies[0].nativeElement.innerHTML).toContain('test-currience')
      expect(countryCurrencies[1].nativeElement.innerHTML).toContain('test2-currience')

      expect(countryLanguages).toHaveLength(2)
      expect(countryLanguages[0].nativeElement.innerHTML).toContain('pl')
      expect(countryLanguages[1].nativeElement.innerHTML).toContain('eng')

      expect(countryBorders).toHaveLength(1)
      expect(countryBorders[0].nativeElement.innerHTML).toContain('de')
    });

    it('should show spinner when details are loading',  ()=> {
      component.coutryDetails$=undefined
      fixture.detectChanges()
      const coutryDetailWrapper=fixture.debugElement.query(By.css('.coutry-details__wrapper'))
      const spinner=fixture.debugElement.query(By.css('app-loading-spinner'))

      expect(coutryDetailWrapper).toBeFalsy()
      expect(spinner).toBeTruthy()
    });

    it('should show message when coutry has no borders',  ()=> {
      countryDetailsData.borders=[]
      component.coutryDetails$=of(countryDetailsData)
      fixture.detectChanges()

      const countryBorders=fixture.debugElement.queryAll(By.css('[data-test="coutry-border"]'))
      const noBorders=fixture.debugElement.query(By.css('[data-test="no-borders"]'))

      expect(countryBorders).toHaveLength(0)
      expect(noBorders.nativeElement.innerHTML).toContain('This Coutry has no border coutries')
    });

    it('should return button click call returnToList() method',  fakeAsync(()=> {
      const spyFunction=spyOn(component,'returnToList')

      const returnButton=fixture.debugElement.nativeElement.querySelector('[data-test="return-button"]')
      returnButton.click()
      tick()
      expect(spyFunction).toHaveBeenCalled()
    }))
  })

  describe('Methods',()=>{
    it('should ngOnInit() set coutryDetails$',  (done)=> {
      const spy=jest.spyOn(coutriesService,'getCoutryDetails')
      component.ngOnInit()
      fixture.detectChanges()
      expect(spy).toHaveBeenCalledWith('testCoutry')
      component.coutryDetails$?.subscribe(details=>{
        expect(details).toEqual(countryDetailsData)
        done()
      })
    });

    it('should returnToList() method navigate into previous page',  ()=> {
      component.returnToList()
      expect(navigateMock).toHaveBeenNthCalledWith(1,['..'])
    });
  })
});
