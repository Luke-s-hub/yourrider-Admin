import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedCompaniesComponent } from './approved-companies.component';

describe('ApprovedCompaniesComponent', () => {
  let component: ApprovedCompaniesComponent;
  let fixture: ComponentFixture<ApprovedCompaniesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovedCompaniesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
