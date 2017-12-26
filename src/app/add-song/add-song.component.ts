import { Component, OnInit } from '@angular/core';
import { Song } from '../data models/song';
import { SongsService } from '../services/songs.service';

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.scss']
})
export class AddSongComponent implements OnInit {
  genres = ['Pop', 'Rock', 'Disco Polo', 'Reggae', ];
  years = [];
  languages = ['English', 'Polish'];
  songToAdd= new Song('', '', '', '', '', '');

  constructor(private songService: SongsService) {
    for (let i = 2017; i > 1940; i--) {
      this.years.push(i);
    }
   }

  ngOnInit() {
  }
  addSong() {
    console.log(this.songToAdd);
    this.songService.addSong(this.songToAdd);
  }
}
