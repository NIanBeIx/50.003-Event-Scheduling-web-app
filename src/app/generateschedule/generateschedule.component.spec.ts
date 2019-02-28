import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratescheduleComponent } from './generateschedule.component';

describe('GeneratescheduleComponent', () => {
  let component: GeneratescheduleComponent;
  let fixture: ComponentFixture<GeneratescheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneratescheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratescheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
