import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApexMixedComponent } from './apex-mixed.component';

describe('ApexMixedComponent', () => {
  let component: ApexMixedComponent;
  let fixture: ComponentFixture<ApexMixedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApexMixedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApexMixedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
