import Manga from "./Manga";
import Category from "./Category";

class CategoryManga {
  cid: number;
  mid: number;
  category: Category;
  manga: Manga;

  constructor(cid: number, mid: number, category: Category, manga: Manga) {
    this.cid = cid;
    this.mid = mid;
    this.category = category;
    this.manga = manga;
  }
}

export default CategoryManga;
