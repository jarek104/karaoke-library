import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomMatarialModule } from './custom-matarial/custom-matarial.module';
import { DataTableComponent } from './data-table/data-table.component';

const config = {
  apiKey: 'AIzaSyC8Xx4ciBqbxD7ROBcWet5RsKrIe0CTCB0',
  authDomain: 'karaoke-library.firebaseapp.com',
  databaseURL: 'https://karaoke-library.firebaseio.com',
  projectId: 'karaoke-library',
  storageBucket: 'karaoke-library.appspot.com',
  messagingSenderId: '996280174231'
};

@NgModule({
  declarations: [
    AppComponent,
    DataTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CustomMatarialModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
