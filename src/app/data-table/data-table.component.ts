import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Song } from '../data models/song';
import { DataSource } from '@angular/cdk/table';
import { CollectionViewer } from '@angular/cdk/collections';
import 'rxjs/add/observable/of';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SongsService } from '../services/songs.service';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit, AfterViewInit {
  displayedColumns = ['Author', 'Title', 'Year', 'Genre', 'Language', 'Link'];
  songsFirestoreDocument: AngularFirestoreDocument<Song>;
  dataSource = new MatTableDataSource<Song>();
  initialSelection = [];
  allowMultiSelect = false;

  selectedRow : Number;
  setClickedRow : Function;

  constructor(private songsService: SongsService ) {
    
    this.setClickedRow = function(index, data){
      if (index == this.selectedRow) {
        this.selectedRow = -1;
      }
      else {
        this.selectedRow = index;
      }
      console.log(data);
    }
  }
  @ViewChild(MatSort) sort: MatSort;
  ngOnInit() {
    this.songsService.getSongs().subscribe(data => {
      this.dataSource.data = data;
      console.log(this.dataSource.data);
    });
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
