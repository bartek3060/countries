import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoutriesMainPageComponent } from './coutries-main-page.component';

describe('CoutriesMainPageComponent', () => {
  let component: CoutriesMainPageComponent;
  let fixture: ComponentFixture<CoutriesMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoutriesMainPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoutriesMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
