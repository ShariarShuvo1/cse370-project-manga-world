import Author from "./Author";
import User from "./User";

class Follow {
  userId: number;
  aid: number;
  user: User;
  author: Author;

  constructor(userId: number, aid: number, user: User, author: Author) {
    this.userId = userId;
    this.aid = aid;
    this.user = user;
    this.author = author;
  }
}

export default Follow;
