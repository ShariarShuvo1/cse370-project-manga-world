import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/";

class MangaPictureController {
  getByManga(manga: any) {
    return axios.post(USER_API_BASE_URL + "mangaPictures/getByManga", manga);
  }
  addNewPicture(mangaPicture: any) {
    return axios.post(
      USER_API_BASE_URL + "mangaPictures/addNewPicture",
      mangaPicture
    );
  }
}

export default new MangaPictureController();
