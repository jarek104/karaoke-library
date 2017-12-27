export class Song {
  SongID;
  constructor(
    public Author: string,
    public Title: string,
    public Link: string,
    public Genre?: string,
    public Year?: string,
    public Language?: string
  ) {
    this.SongID = '0';
  }

  makeid() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
}
