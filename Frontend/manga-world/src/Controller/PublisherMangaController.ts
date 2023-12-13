import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/";

class PublisherMangaController {
  getPublisherMangaByManga(manga: any) {
    return axios.post(
      USER_API_BASE_URL + "publisherMangas/getPublisherMangaByManga",
      manga
    );
  }
  addPublisherManga(publisherManga: any) {
    return axios.post(
      USER_API_BASE_URL + "publisherMangas/addPublisherManga",
      publisherManga
    );
  }
}

export default new PublisherMangaController();
