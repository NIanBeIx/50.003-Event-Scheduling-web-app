import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeforeScheduleDisplayComponent } from './before-schedule-display.component';
import {FormsModule} from '@angular/forms';
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

describe('BeforeScheduleDisplayComponent', () => {
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
        MatRadioModule],
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
