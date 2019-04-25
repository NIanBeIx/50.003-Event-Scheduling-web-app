import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
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
import { AuthService } from 'app/db-service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

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
      declarations: [ LoginComponent ],
      providers: [AuthService, { provide: Router, useClass: class { navigate = jasmine.createSpy("navigate"); } }]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render text in a h4 tag', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h4').textContent).toContain(' Login to SUTD Scheduler Station');
  });

  it('should render text in a label tag', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('label').textContent).toContain('Email Address');
  });

  it('should render text in a strong tag', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('strong').textContent).toContain('Error!');
  });


});
