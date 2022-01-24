import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiderCompanyComponent } from './rider-company.component';

describe('RiderCompanyComponent', () => {
  let component: RiderCompanyComponent;
  let fixture: ComponentFixture<RiderCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiderCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiderCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
