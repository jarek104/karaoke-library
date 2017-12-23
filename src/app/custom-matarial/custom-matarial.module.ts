import { NgModule } from '@angular/core';
import {MatButtonModule, MatCheckboxModule, MatTableModule} from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatTableModule],
  exports: [MatButtonModule, MatCheckboxModule, MatTableModule],
  declarations: []
})
export class CustomMatarialModule { }
