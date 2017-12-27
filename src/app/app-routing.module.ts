import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataTableComponent } from './data-table/data-table.component';
import { EditSongComponent } from './edit-song/edit-song.component';

const routes: Routes = [
  { path: 'edit/:id', component: EditSongComponent},
  { path: 'data', component: DataTableComponent},
  { path: '' , redirectTo: '/data', pathMatch: 'full'},
  { path: '**' , component: DataTableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
