import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import { GeneratescheduleComponent } from './generateschedule.component';
import {MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,

    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatCommonModule,
    MatInputModule,
    MatDialogModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatRadioModule} from '@angular/material';

describe('GeneratescheduleComponent', () => {
  let component: GeneratescheduleComponent;
  let fixture: ComponentFixture<GeneratescheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule,MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,

    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatCommonModule,
    MatInputModule,
    MatDialogModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatRadioModule],
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

  it('should render text in a h3 tag', () => {
    const fixture = TestBed.createComponent(GeneratescheduleComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h3').textContent).toContain('Generate New Module');
  });

  it('should render text in a h5 tag', () => {
    const fixture = TestBed.createComponent(GeneratescheduleComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h5').textContent).toContain('Insert the Course ID to be Generated.');
  });

  it('should render text in a h6 tag', () => {
    const fixture = TestBed.createComponent(GeneratescheduleComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h6').textContent).toContain('Put the full names of desired instructors separated by a comma. Eg: Will SMith, Tan Ah Beng, Muhammad Ali');
  });

  
});
