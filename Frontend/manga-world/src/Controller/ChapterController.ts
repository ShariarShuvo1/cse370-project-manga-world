import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/";

class ChapterController {
  findAllByVolume(volume: any) {
    return axios.post(USER_API_BASE_URL + "chapters/findAllByVolume", volume);
  }
  findChapterPicture(chapter: any) {
    return axios.post(
      USER_API_BASE_URL + "chapters/findChapterPicture",
      chapter
    );
  }

  addNewChapter(chapter: any) {
    return axios.post(USER_API_BASE_URL + "chapters/addNewChapter", chapter);
  }

  addChapterCover(chapterCover: any) {
    return axios.post(
      USER_API_BASE_URL + "chapters/addChapterCover",
      chapterCover
    );
  }

  addChapterPdf(chapterPdf: any) {
    return axios.post(USER_API_BASE_URL + "chapters/addChapterPdf", chapterPdf);
  }

  viewIncrement(chapter: any) {
    return axios.post(USER_API_BASE_URL + "chapters/viewIncrement", chapter);
  }
}

export default new ChapterController();
