import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
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
import { MessagesComponent } from './messages.component';

describe('MessagesComponent', () => {
  let component: MessagesComponent;
  let fixture: ComponentFixture<MessagesComponent>;

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
    BrowserAnimationsModule],
      declarations: [ MessagesComponent ], 
      providers: [ { provide: Router, useClass: class { navigate = jasmine.createSpy("navigate"); } }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render text in a mat-card-title tag', () => {
    const fixture = TestBed.createComponent(MessagesComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-card-title').textContent).toContain('Send Course Coordinator Message');
  });

  
});
