import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/";

class UserController {
  getUserById(userId: string) {
    return axios.get(USER_API_BASE_URL + "users/getUserById/" + userId);
  }
  deleteUser(userId: any) {
    return axios.delete(USER_API_BASE_URL + "users/deleteUser/" + userId);
  }

  searchByName(keyword: any) {
    return axios.post(USER_API_BASE_URL + "users/searchByName", keyword);
  }
}

export default new UserController();
