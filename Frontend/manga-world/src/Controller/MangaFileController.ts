import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/";

class MangaPictureController {
  findMangaFileByChapter(chapter: any) {
    return axios.post(
      USER_API_BASE_URL + "mangaFile/findMangaFileByChapter",
      chapter
    );
  }
}

export default new MangaPictureController();
