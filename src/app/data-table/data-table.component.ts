import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Song } from '../data models/song';
import { DataSource } from '@angular/cdk/table';
import { CollectionViewer } from '@angular/cdk/collections';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  displayedColumns = ['Author', 'Title', 'Year', 'Genre', 'Language', 'SongID', 'Link'];
  songsFirestoreCollection: AngularFirestoreCollection<Song>;
  songsFirestoreDocument: AngularFirestoreDocument<Song>;
  songs: SongsDataSource;

  constructor(private afs: AngularFirestore ) {
    this.songs = new SongsDataSource(this.afs);
  }

  ngOnInit() {}
}
export class SongsDataSource extends DataSource<any> {
  constructor(private newAfs: AngularFirestore) {
    super();
  }
  connect(): Observable<any[]> {
    return this.newAfs.collection('Songs').valueChanges();
  }

  disconnect() { }
}
