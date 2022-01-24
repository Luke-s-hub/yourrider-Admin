import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiderCodeComponent } from './rider-code.component';

describe('RiderCodeComponent', () => {
  let component: RiderCodeComponent;
  let fixture: ComponentFixture<RiderCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiderCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiderCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
