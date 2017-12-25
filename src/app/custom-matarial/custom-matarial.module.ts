import { NgModule } from '@angular/core';
import { MatButtonModule,
  MatCheckboxModule,
  MatTableModule,
  MatInputModule,
  MatFormFieldModule,
  MatSortModule,
  MatToolbarModule,
  MatOptionModule,
  MatSelectModule } from '@angular/material';

@NgModule({
  imports: [MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatToolbarModule,
    MatOptionModule,
    MatSelectModule
  ],
  exports: [MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatToolbarModule,
    MatOptionModule,
    MatSelectModule],
  declarations: []
})
export class CustomMatarialModule { }
