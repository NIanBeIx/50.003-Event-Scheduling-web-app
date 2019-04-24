import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardActions } from '@angular/material';
import { SoftconstraintsComponent } from './softconstraints.component';

describe('SoftconstraintsComponent', () => {
  let component: SoftconstraintsComponent;
  let fixture: ComponentFixture<SoftconstraintsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoftconstraintsComponent, MatCardActions ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoftconstraintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render text in a h3 tag', () => {
    const fixture = TestBed.createComponent(SoftconstraintsComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h3').textContent).toContain('Choose the periods when you would prefer not to have lessons.');
  });

  it('should render text in a h5 tag', () => {
    const fixture = TestBed.createComponent(SoftconstraintsComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h5').textContent).toContain('Monday:');
  });

  it('should render text in a label tag', () => {
    const fixture = TestBed.createComponent(SoftconstraintsComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('label').textContent).toContain('0800-0830');
  });

  
});
