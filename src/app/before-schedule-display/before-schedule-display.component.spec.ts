import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeforeScheduleDisplayComponent } from './before-schedule-display.component';

describe('BeforeScheduleDisplayComponent', () => {
  let component: BeforeScheduleDisplayComponent;
  let fixture: ComponentFixture<BeforeScheduleDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeforeScheduleDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeforeScheduleDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
