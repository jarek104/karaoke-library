import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Song } from '../data models/song';


@Injectable()
export class SongsService {

  songsCollection: AngularFirestoreCollection<Song>;
  songs: Observable<Song[]>;

  constructor(public afs: AngularFirestore) {
    this.songsCollection = afs.collection('Songs');

    this.songs = this.songsCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Song;
        data.SongID = a.payload.doc.id;
        return data;
      });
    });

  }

  getSongs() {
    return this.songs;
  }
  addSong (songToAdd: Song) {
    const data = {
      Author: songToAdd.Author,
      Title: songToAdd.Title,
      Year: songToAdd.Year,
      Genre: songToAdd.Genre,
      Language: songToAdd.Language,
      Link: songToAdd.Link
    };
    this.afs.collection('Songs').add(data);
  }
}
