import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/";

class VolumeController {
  findAllByManga(manga: any) {
    return axios.post(USER_API_BASE_URL + "volumes/findAllByManga", manga);
  }
  findVolumePicture(volume: any) {
    return axios.post(USER_API_BASE_URL + "volumes/findVolumePicture", volume);
  }

  addNewVolume(volume: any) {
    return axios.post(USER_API_BASE_URL + "volumes/addNewVolume", volume);
  }

  addVolumeCover(volumeCover: any) {
    return axios.post(
      USER_API_BASE_URL + "volumes/addVolumeCover",
      volumeCover
    );
  }

  viewIncrement(volume: any) {
    return axios.post(USER_API_BASE_URL + "volumes/viewIncrement", volume);
  }
}
export default new VolumeController();
