import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoutriesDetailsComponent } from './coutries-details.component';

describe('CoutriesDetailsComponent', () => {
  let component: CoutriesDetailsComponent;
  let fixture: ComponentFixture<CoutriesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoutriesDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoutriesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
