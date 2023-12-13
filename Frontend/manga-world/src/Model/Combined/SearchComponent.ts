import Manga from "../Manga";
import Author from "../Author";
import Publisher from "../Publisher";

class SearchComponent {
  mangas: Manga[];
  authors: Author[];
  publishers: Publisher[];

  constructor(mangas: Manga[], authors: Author[], publishers: Publisher[]) {
    this.mangas = [];
    this.authors = [];
    this.publishers = [];
  }
}

export default SearchComponent;
