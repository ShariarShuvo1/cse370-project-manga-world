import Manga from "./Manga";
import Publisher from "./Publisher";

class PublisherManga {
  pid: number;
  mid: number;
  publisher: Publisher;
  manga: Manga;

  constructor(pid: number, mid: number, publisher: Publisher, manga: Manga) {
    this.pid = pid;
    this.mid = mid;
    this.publisher = publisher;
    this.manga = manga;
  }
}

export default PublisherManga;
