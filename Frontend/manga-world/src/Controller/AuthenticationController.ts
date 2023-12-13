import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/";

class AuthenticationController {
  login(credentials: any) {
    return axios.post(USER_API_BASE_URL + "login", credentials);
  }

  signup(credentials: any) {
    return axios.post(USER_API_BASE_URL + "signup", credentials);
  }
}

export default new AuthenticationController();
