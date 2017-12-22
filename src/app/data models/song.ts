export class Song {
    constructor(
      public Author: string,
      public Title: string,
      public Link: string,
      public Genre?: string,
      public Year?: string,
      public Language?: string
    ) {}
  }
