import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftconstraintsComponent } from './softconstraints.component';

describe('SoftconstraintsComponent', () => {
  let component: SoftconstraintsComponent;
  let fixture: ComponentFixture<SoftconstraintsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoftconstraintsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoftconstraintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
