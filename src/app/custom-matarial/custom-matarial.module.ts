import { NgModule } from '@angular/core';
import { MatButtonModule,
  MatCheckboxModule,
  MatTableModule,
  MatInputModule,
  MatFormFieldModule,
  MatSortModule,
  MatToolbarModule } from '@angular/material';

@NgModule({
  imports: [MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatToolbarModule
  ],
  exports: [MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatToolbarModule],
  declarations: []
})
export class CustomMatarialModule { }
