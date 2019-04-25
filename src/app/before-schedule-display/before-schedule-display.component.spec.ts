import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BeforeScheduleDisplayComponent } from './before-schedule-display.component';
import {FormsModule} from '@angular/forms';
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
    MatRadioModule
  } from '@angular/material';

xdescribe('BeforeScheduleDisplayComponent', () => {
  let component: BeforeScheduleDisplayComponent;
  let fixture: ComponentFixture<BeforeScheduleDisplayComponent>;

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
        MatRadioModule,
        RouterTestingModule
      ],
      providers: [ Router ],
      declarations: [ BeforeScheduleDisplayComponent ]
    })
    .compileComponents();
  }));

  //beforeEach(() => {
  //  fixture = TestBed.createComponent(BeforeScheduleDisplayComponent);
  //  component = fixture.componentInstance;
  //  fixture.detectChanges();
  //});

  it('should render text in a h5 tag', () => {
    const fixture = TestBed.createComponent(BeforeScheduleDisplayComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h5').textContent).toContain('welcome to SUTD');
  });

  
});
