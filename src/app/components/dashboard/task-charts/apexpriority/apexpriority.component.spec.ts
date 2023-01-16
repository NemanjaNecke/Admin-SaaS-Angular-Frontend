import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApexpriorityComponent } from './apexpriority.component';

describe('ApexpriorityComponent', () => {
  let component: ApexpriorityComponent;
  let fixture: ComponentFixture<ApexpriorityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApexpriorityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApexpriorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
