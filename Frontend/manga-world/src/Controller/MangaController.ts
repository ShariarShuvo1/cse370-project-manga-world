import axios from "axios";
import Category from "../Model/Category";

const USER_API_BASE_URL = "http://localhost:8080/";

class MangaController {
  getAllMangaNames() {
    return axios.get(USER_API_BASE_URL + "mangas/getAllMangaNames");
  }
  getMostViewedManga() {
    return axios.get(USER_API_BASE_URL + "mangas/getMostViewedManga");
  }

  getMostRatedManga() {
    return axios.get(USER_API_BASE_URL + "mangas/getMostRatedManga");
  }

  getNewManga() {
    return axios.get(USER_API_BASE_URL + "mangas/getNewManga");
  }

  getMostReadMangas() {
    return axios.get(USER_API_BASE_URL + "mangas/getMostReadMangas");
  }
  getTodayPickMangas() {
    return axios.get(USER_API_BASE_URL + "mangas/getTodayPickMangas");
  }

  getBasedOnLastSearch(userId: string) {
    return axios.get(
      USER_API_BASE_URL + "mangas/getBasedOnLastSearch" + "/" + userId
    );
  }

  getMostViewedBasedOnCategory(pageNumber: number, category: any) {
    return axios.post(
      USER_API_BASE_URL +
        "mangas/getMostViewedBasedOnCategory" +
        "/" +
        pageNumber,
      category
    );
  }

  getMostViewedCountBasedOnCategory(category: any) {
    return axios.post(
      USER_API_BASE_URL + "mangas/getMostViewedCountBasedOnCategory",
      category
    );
  }

  addNewManga(manga: any) {
    return axios.post(USER_API_BASE_URL + "mangas/addNewManga", manga);
  }

  searchByKeyword(keyword: any) {
    return axios.post(USER_API_BASE_URL + "mangas/searchByKeyword", keyword);
  }

  mangaViewIncrement(manga: any) {
    return axios.post(USER_API_BASE_URL + "mangas/viewIncrement", manga);
  }

  getAverageRating(manga: any) {
    return axios.post(USER_API_BASE_URL + "mangas/getAverageRating", manga);
  }

  getTotalRating(manga: any) {
    return axios.post(USER_API_BASE_URL + "mangas/getTotalRating", manga);
  }

  deleteManga(mangaId: any) {
    return axios.delete(
      USER_API_BASE_URL + "mangas/deleteManga" + "/" + mangaId
    );
  }
}

export default new MangaController();
