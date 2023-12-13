import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/";

class AuthorController {
  getAllAuthorManga(pageNumber: number, author: any) {
    return axios.post(
      USER_API_BASE_URL + "authors/getAllAuthorManga" + "/" + pageNumber,
      author
    );
  }

  getAuthorMangaCount(author: any) {
    return axios.post(
      USER_API_BASE_URL + "authors/getAuthorMangaCount",
      author
    );
  }

  findAuthorPictureByAuthor(author: any) {
    return axios.post(
      USER_API_BASE_URL + "authors/findAuthorPictureByAuthor",
      author
    );
  }
  addNewAuthor(author: any) {
    return axios.post(USER_API_BASE_URL + "authors/addNewAuthor", author);
  }

  addAuthorPicture(authorPicture: any) {
    return axios.post(
      USER_API_BASE_URL + "authors/addAuthorPicture",
      authorPicture
    );
  }
  getAllAuthors() {
    return axios.get(USER_API_BASE_URL + "authors/getAllAuthors");
  }
}

export default new AuthorController();
