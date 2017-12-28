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

  genres = ['Pop', 'Rock', 'Disco Polo', 'Reggae', 'Hip Hop', 'Dance', 'R&B', 'Country' ];
  years = [];
  difficulties = ['Easy', 'Medium', 'Hard'];
  languages = ['English', 'Polish', 'Serbian'];

  songToEdit: Song = new Song('', '', '', '', '', '');
  editSong: Observable<Song>;
  form: FormGroup;
  error;
  pageTitle = '';
  addMode: Boolean;
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
      difficultyControl: ['', Validators.required],
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
  navigateBack() {
    this.router.navigate(['/data']);
  }
  addSong() {
    this.songObjectFromForm();
    if (this.form.valid) {
      this.songService.addSong(this.songToEdit);
      this.router.navigate(['/data']);
    }
  }
  saveSong() {
    this.songObjectFromForm();
    console.log(this.songToEdit);
    console.log(this.songToEdit.SongID);
    this.songService.updateSong(this.songToEdit);
    this.router.navigate(['/data']);
  }
  deleteSong() {
    console.log(this.songToEdit.SongID);
    this.songService.deleteSong(this.songToEdit.SongID);
    this.router.navigate(['/data']);
  }

  getSong(id: string): any {
    this.songService.getSongObservable(id).subscribe(
      (song: Song) => {
        this.onSongRetrieved(song);
        song.SongID = id;
      },
      (error: any) => this.error = <any>error
    );
  }

  songObjectFromForm() {
    // const tempSong = this.songService.initializeSong();
    this.songToEdit.Author = this.form.get('authorControl').value;
    this.songToEdit.Title = this.form.get('titleControl').value;
    this.songToEdit.Genre = this.form.get('genreControl').value;
    this.songToEdit.Year = this.form.get('yearControl').value;
    this.songToEdit.Difficulty = this.form.get('difficultyControl').value;
    this.songToEdit.Language = this.form.get('languageControl').value;
    this.songToEdit.Link = this.form.get('linkControl').value;
  }

  onSongRetrieved(song: Song): void {
    if (this.form) {
      this.form.reset();
    }
    this.songToEdit = song;
    
    if (song.SongID === '0' || undefined) {
      this.addMode = true;
      this.pageTitle = 'Add New Song';
    } else {
      this.pageTitle = `Edit Song`;
      this.addMode = false;
    }

    this.form.patchValue({
      authorControl: this.songToEdit.Author,
      titleControl: this.songToEdit.Title,
      genreControl: this.songToEdit.Genre,
      difficultyControl: this.songToEdit.Difficulty,
      yearControl: this.songToEdit.Year,
      languageControl: this.songToEdit.Language,
      linkControl: this.songToEdit.Link,
    });
  }
}
