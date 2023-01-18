import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoutriesDetailsComponent } from './coutries-details.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import {ReactiveFormsModule} from "@angular/forms";

const fakeRouteParams = {
  snapshot: { testParam: 'test' },
  params: of({ 'coutry-name': 'testCoutry' }),
};

describe('CoutriesDetailsComponent', () => {
  let component: CoutriesDetailsComponent;
  let fixture: ComponentFixture<CoutriesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule,ReactiveFormsModule],
      declarations: [CoutriesDetailsComponent],
      providers: [{ provide: ActivatedRoute, useValue: fakeRouteParams }],
    }).compileComponents();

    fixture = TestBed.createComponent(CoutriesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
