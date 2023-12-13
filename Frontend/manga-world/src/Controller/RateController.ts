import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/";

class RateController {
  getAllRating(pageNumber: any, manga: any) {
    return axios.post(
      USER_API_BASE_URL + "rates/getAllRating/" + pageNumber,
      manga
    );
  }

  findRateByUser(useId: any, manga: any) {
    return axios.post(
      USER_API_BASE_URL + "rates/findRateByUser/" + useId,
      manga
    );
  }

  addNewRate(rate: any) {
    return axios.post(USER_API_BASE_URL + "rates/addNewRate", rate);
  }
}

export default new RateController();
