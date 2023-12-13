import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/";

class AuthoritiesController {
  getAuthByUserId(id: any) {
    return axios.get(USER_API_BASE_URL + "getAuthByUserId/" + id);
  }
}

export default new AuthoritiesController();
