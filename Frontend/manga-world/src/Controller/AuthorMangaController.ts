import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/";

class AuthorMangaController {
  getAuthorMangaByManga(manga: any) {
    return axios.post(
      USER_API_BASE_URL + "authorMangas/getAuthorMangaByManga",
      manga
    );
  }

  addAuthorManga(authorManga: any) {
    return axios.post(
      USER_API_BASE_URL + "authorMangas/addAuthorManga",
      authorManga
    );
  }
}

export default new AuthorMangaController();
