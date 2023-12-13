import User from "./User";
import Manga from "./Manga";

class AlreadyRead {
  userId: number;
  mid: number;
  addedDate: Date;
  user: User;
  manga: Manga;

  constructor(
    userId: number,
    mid: number,
    addedDate: Date,
    user: User,
    manga: Manga
  ) {
    this.userId = userId;
    this.mid = mid;
    this.addedDate = addedDate;
    this.user = user;
    this.manga = manga;
  }
}

export default AlreadyRead;
