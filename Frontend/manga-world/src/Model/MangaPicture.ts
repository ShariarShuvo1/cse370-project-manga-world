import Manga from "./Manga";

class MangaPicture {
  mpId: number;
  mpPicture: string;
  manga: Manga;

  constructor(mpId: number, mpPicture: string, manga: Manga) {
    this.mpId = mpId;
    this.mpPicture = mpPicture;
    this.manga = manga;
  }
}

export default MangaPicture;
