import { CoutriesService } from './coutries.service';
import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {Coutry} from "../interfaces/coutry";

const mockAllCoutriesResponse:Coutry[] = [
  {
    name: 'Poland',
    capital: 'Warsaw',
    region: 'Europe',
    population: 35000000,
    flags: { png: 'test1/url.com' },
  },
  {
    name: 'Deutschland',
    capital: 'Berlin',
    region: 'Europe',
    population: 40000000,
    flags: { png: 'test2/url.com' },
  },
  {
    name: 'Egypt',
    capital: 'Kair',
    region: 'Africa',
    population: 10000000,
    flags: { png: 'test3/url.com' },
  },
];

const mockedCoutryDetails ={
  name: 'Poland',
  capital: 'Warsaw',
  region: 'Europe',
  population: '35000000',
  flags: { png: 'test/url.com' },
  nativeName:'Polska',
  subRegion:'East Europe',
  topLevelDomain:'.pl',
  currencies:[{name:'zloty'}],
  languages:[{name:'Polski'}],
  borders:['DE','CH']
}

describe('Coutries service', () => {
  let coutriesService: CoutriesService;
  let httpMock:HttpTestingController

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers: [
        CoutriesService,
      ],
    }).compileComponents();
    coutriesService = TestBed.inject(CoutriesService);
    httpMock=TestBed.get(HttpTestingController)
  });

  afterEach(()=>{
    httpMock.verify()
  })

  it('should create', () => {
    expect(coutriesService).toBeTruthy();
  });


  describe('getAllCoutries() method', () => {
    it('should return Coutries array if httpClient get method return Coutries', (done) => {

      coutriesService.getAllCoutries().subscribe(coutries=>{
        expect(coutries).toStrictEqual(mockAllCoutriesResponse)
        done()
      })

      const req=httpMock.expectOne('https://restcountries.com/v2/all?fields=name,capital,region,population,flags')

      expect(req.request.method).toBe('GET')
      req.flush(mockAllCoutriesResponse)
    });
  });

  describe('getCoutryDetails() method',()=>{
    it('should return CoutryDetails if httpClient get method return Coutries',  (done)=> {

      coutriesService.getCoutryDetails('poland').subscribe(coutryDetails=>{
        expect(coutryDetails).toStrictEqual(mockedCoutryDetails)
        done()
      })

      const req=httpMock.expectOne('https://restcountries.com/v2/name/poland?fields=name,capital,region,population,flags,nativeName,subregion,topLevelDomain,currencies,languages,borders')
      expect(req.request.method).toBe('GET')
      req.flush([mockedCoutryDetails])

    });
  })

  describe('Filter coutries method',()=>{

    it('should return not changed coutries if filters are default or searchValue contains only spaces',  ()=> {
      const filterObject={searchValue:'  ',regionValue:'All'}
      expect(coutriesService.filterCoutries(filterObject,mockAllCoutriesResponse)).toStrictEqual(mockAllCoutriesResponse)
    });


    it('should return coutries which name contains provided search Value',  ()=> {
      const filterObject={searchValue:'pola',regionValue:'All'}
      expect(coutriesService.filterCoutries(filterObject,mockAllCoutriesResponse)).toStrictEqual(mockAllCoutriesResponse.slice(0,1))
    });

    it('should return empty array if coutries name not contains provided search Value',  ()=> {
      const filterObject={searchValue:'test',regionValue:'All'}
      expect(coutriesService.filterCoutries(filterObject,mockAllCoutriesResponse)).toStrictEqual([])
    });

    it('should return coutries which name contains provided search Value and region contains provided regionType',  ()=> {
      const filterObject={searchValue:'Deu',regionValue:'Europe'}
      expect(coutriesService.filterCoutries(filterObject,mockAllCoutriesResponse)).toStrictEqual(mockAllCoutriesResponse.slice(1,2))
    });

    it('should return empty array if coutries matches only  1 of 2 filters',  ()=> {
      const filterObject={searchValue:'pol',regionValue:'Asia'}
      expect(coutriesService.filterCoutries(filterObject,mockAllCoutriesResponse)).toStrictEqual([])
    });

    it('should return empty array if coutries name not contains provided search Value and region not contains provided regionType',  ()=> {
      const filterObject={searchValue:'test',regionValue:'Asia'}
      expect(coutriesService.filterCoutries(filterObject,mockAllCoutriesResponse)).toStrictEqual([])
    });

    it('should return coutries which region contains provided regionType',  ()=> {
      const filterObject={searchValue:'',regionValue:'Africa'}
      expect(coutriesService.filterCoutries(filterObject,mockAllCoutriesResponse)).toStrictEqual(mockAllCoutriesResponse.slice(2,3))
    });

    it('should return empty array if coutries region not contains provided regionType',  ()=> {
      const filterObject={searchValue:'',regionValue:'Africa'}
      expect(coutriesService.filterCoutries(filterObject,mockAllCoutriesResponse)).toStrictEqual(mockAllCoutriesResponse.slice(2,3))
    });
  })
});
