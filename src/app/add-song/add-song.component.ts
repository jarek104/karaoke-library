import { Component, OnInit } from '@angular/core';
import { Song } from '../data models/song';
import { SongsService } from '../services/songs.service';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.scss']
})
export class AddSongComponent implements OnInit {
  genres = ['Pop', 'Rock', 'Disco Polo', 'Reggae', ];
  years = [];
  languages = ['English', 'Polish'];
  songToAdd: Song = new Song('', '', '', '', '', '');
  form: FormGroup;
  

  constructor(private songService: SongsService, private formBuilder: FormBuilder, private router: Router) {
    for (let i = 2017; i > 1940; i--) {
      this.years.push(i);
    }
   }

  ngOnInit() {
    this.form = this.formBuilder.group({
      authorControl: [null, Validators.required],
      titleControl: [null, Validators.required],
      genreControl: [null, Validators.required],
      yearControl: [null],
      languageControl: [null, Validators.required],
      linkControl: [null, Validators.required],
    });
  }
  addSong() {

    this.songToAdd.Author = this.form.get("authorControl").value;
    this.songToAdd.Title = this.form.get("titleControl").value;
    this.songToAdd.Genre = this.form.get("genreControl").value;
    this.songToAdd.Year = this.form.get("yearControl").value;
    this.songToAdd.Language = this.form.get("languageControl").value;
    this.songToAdd.Link = this.form.get("linkControl").value;
    if(this.form.valid) {
      this.songService.addSong(this.songToAdd);
      this.router.navigate(['/data']);    
    }
  }
  navigateBack() {
    this.router.navigate(['/data']);   
  }
}
