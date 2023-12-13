import Manga from "./Manga";
import User from "./User";

class Rate {
  rid: number;
  rvalue: number;
  rdate: Date;
  rcomment: string;
  userId: number;
  mid: number;
  user: User;
  manga: Manga;

  constructor(
    rid: number,
    rvalue: number,
    rdate: Date,
    rcomment: string,
    userId: number,
    mid: number,
    user: User,
    manga: Manga
  ) {
    this.rid = rid;
    this.rvalue = rvalue;
    this.rdate = rdate;
    this.rcomment = rcomment;
    this.userId = userId;
    this.mid = mid;
    this.user = user;
    this.manga = manga;
  }
}

export default Rate;
