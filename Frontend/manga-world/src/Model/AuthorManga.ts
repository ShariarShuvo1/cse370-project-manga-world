import Author from "./Author";
import Manga from "./Manga";

class AuthorManga {
  aid: number;
  mid: number;
  author: Author;
  manga: Manga;

  constructor(aid: number, mid: number, author: Author, manga: Manga) {
    this.aid = aid;
    this.mid = mid;
    this.author = author;
    this.manga = manga;
  }
}

export default AuthorManga;
