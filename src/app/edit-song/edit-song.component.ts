import { Component, OnInit } from '@angular/core';
import { Song } from '../data models/song';
import { SongsService } from '../services/songs.service';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-edit-song',
  templateUrl: './edit-song.component.html',
  styleUrls: ['./edit-song.component.scss']
})
export class EditSongComponent implements OnInit, OnDestroy {

  genres = ['Pop', 'Rock', 'Disco Polo', 'Reggae', ];
  years = [];
  languages = ['English', 'Polish'];
  songToAdd: Song = new Song('', '', '', '', '', '');
  songToEdit: Song;
  editSong: Observable<Song>;
  form: FormGroup;
  error;
  pageTitle;
  private sub: Subscription;

  constructor(private songService: SongsService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
    for (let i = 2017; i > 1940; i--) {
      this.years.push(i);
    }
   }

  ngOnInit() {
    this.form = this.formBuilder.group({
      authorControl: ['', Validators.required],
      titleControl: ['', Validators.required],
      genreControl: ['', Validators.required],
      yearControl: [''],
      languageControl: ['', Validators.required],
      linkControl: ['', Validators.required],
    });

    this.sub = this.route.params.subscribe(
      params => {
          const id = params['id'];
          this.getSong(id);
      }
    );
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  addSong() {

    this.songToAdd.Author = this.form.get('authorControl').value;
    this.songToAdd.Title = this.form.get('titleControl').value;
    this.songToAdd.Genre = this.form.get('genreControl').value;
    this.songToAdd.Year = this.form.get('yearControl').value;
    this.songToAdd.Language = this.form.get('languageControl').value;
    this.songToAdd.Link = this.form.get('linkControl').value;
    if (this.form.valid) {
      this.songService.addSong(this.songToAdd);
      this.router.navigate(['/data']);
    }
  }
  navigateBack() {
    this.router.navigate(['/data']);
  }

  getSong(id: string): any {
    this.songService.getSongObservable(id).subscribe(
      (song: Song) => this.onSongRetrieved(song),
      (error: any) => this.error = <any>error
    );
  }
  onSongRetrieved(song: Song): void {
    if (this.form) {
      this.form.reset();
    }

    this.songToEdit = song;
    
    if (song.SongID === '0') {
      this.pageTitle = 'Add New Song';
    } else {
      this.pageTitle = `Edit Song`;
    }

    this.form.patchValue({
      authorControl: this.songToEdit.Author,
      titleControl: this.songToEdit.Title,
      genreControl: this.songToEdit.Genre,
      yearControl: this.songToEdit.Year,
      languageControl: this.songToEdit.Language,
      linkControl: this.songToEdit.Link,
    });
  }
}
