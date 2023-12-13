import Author from "./Author";

class AuthorPicture {
  apId: number;
  apPicture: string;
  author: Author;

  constructor(apId: number, apPicture: string, author: Author) {
    this.apId = apId;
    this.apPicture = apPicture;
    this.author = author;
  }
}

export default AuthorPicture;
