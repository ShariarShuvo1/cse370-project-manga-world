import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/";

class SearchController {
  search(userId: string, searchText: String) {
    return axios.post(USER_API_BASE_URL + "search" + "/" + userId, searchText);
  }
}

export default new SearchController();
