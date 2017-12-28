import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Song } from '../data models/song';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Injectable()
export class SongsService implements OnInit {


  songsCollection: AngularFirestoreCollection<Song>;
  songsObservable: Observable<Song[]>;
  songFirestoreDocument: AngularFirestoreDocument<Song>;

  constructor(public afs: AngularFirestore) {

  }
  ngOnInit(): void {
  }

  getSongs() {
    this.songsCollection = this.afs.collection('Songs', ref => ref.orderBy('Author', 'asc'));
    return this.songsCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Song;
        data.SongID = a.payload.doc.id;
        console.log(' times called snapshotchanges () in the constructor' + data);
        return data;
      });
    });
  }
  addSong (songToAdd: Song) {
    const data = {
      Author: songToAdd.Author,
      Title: songToAdd.Title,
      Year: songToAdd.Year,
      Difficulty: songToAdd.Difficulty,
      Genre: songToAdd.Genre,
      Language: songToAdd.Language,
      Link: songToAdd.Link
    };
    this.afs.collection('Songs').add(data);
  }
  deleteSong(id: string) {
    console.log('song id ' + id);
    this.afs.doc('Songs/' + id).delete();
  }
  updateSong(edited: Song) {
    this.afs.doc('Songs/' + edited.SongID).update({
      Author: edited.Author,
      Title: edited.Title,
      Difficulty: edited.Difficulty,
      Year: edited.Year,
      Genre: edited.Genre,
      Language: edited.Language,
      Link: edited.Link,
    });
  }

  getSongObservable (id: string): Observable<Song> {
    if (id === '0') {
      return Observable.of(this.initializeSong());
    }

    this.songFirestoreDocument = this.afs.doc('Songs/' + id);
    return this.songFirestoreDocument.valueChanges();

  }
  initializeSong(): Song {
    return new Song('', '', '', 'Medium', 'Pop', '', 'English');
  }
}
