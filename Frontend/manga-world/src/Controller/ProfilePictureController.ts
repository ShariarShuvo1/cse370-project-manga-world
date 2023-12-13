import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/";

class ProfilePictureController {
  getUserProfilePicture(user: any) {
    return axios.post(USER_API_BASE_URL + "getUserProfilePicture", user);
  }

  updateProfilePicture(profilePicture: any) {
    return axios.post(
      USER_API_BASE_URL + "updateProfilePicture",
      profilePicture
    );
  }
}

export default new ProfilePictureController();
