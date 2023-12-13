import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/";

class PublisherController {
  findPublisherPictureByPublisher(publisher: any) {
    return axios.post(
      USER_API_BASE_URL + "publishers/findPublisherPictureByPublisher",
      publisher
    );
  }
  getPublisherMangaCount(publisher: any) {
    return axios.post(
      USER_API_BASE_URL + "publishers/getPublisherMangaCount",
      publisher
    );
  }

  getAllPublisherManga(pageNumber: number, publisher: any) {
    return axios.post(
      USER_API_BASE_URL + "publishers/getAllPublisherManga" + "/" + pageNumber,
      publisher
    );
  }

  addNewPublisher(publisher: any) {
    return axios.post(
      USER_API_BASE_URL + "publishers/addNewPublisher",
      publisher
    );
  }
  addPublisherPicture(publisherPicture: any) {
    return axios.post(
      USER_API_BASE_URL + "publishers/addPublisherPicture",
      publisherPicture
    );
  }

  getAllPublishers() {
    return axios.get(USER_API_BASE_URL + "publishers/getAllPublishers");
  }
}

export default new PublisherController();
