import {NgModule} from '@angular/core';

import {
    MatSidenavModule,
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

@NgModule({
    imports: [
        MatSidenavModule,
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
    ],
    exports: [
        MatSidenavModule,
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
    ]
})

export class MaterialModule{}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'hello',
  template: `<h1>Hello {{name}}!</h1>`,
  styles: [`h1 { font-family: Lato; }`]
})
export class HelloComponent  {
  @Input() name: string;
}

