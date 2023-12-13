import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/";

class FollowController {
  followCheck(follow: any) {
    return axios.post(USER_API_BASE_URL + "followCheck", follow);
  }

  follow(follow1: any) {
    return axios.post(USER_API_BASE_URL + "follow", follow1);
  }

  unfollow(follow1: any) {
    return axios.post(USER_API_BASE_URL + "unfollow", follow1);
  }

  getTotalFollower(author: any) {
    return axios.post(USER_API_BASE_URL + "getTotalFollower", author);
  }

  getAllFollowing(userId: any, pageNumber: any) {
    return axios.get(
      USER_API_BASE_URL + "getAllFollowing/" + userId + "/" + pageNumber
    );
  }

  getTotalFollowing(userId: any) {
    return axios.get(USER_API_BASE_URL + "getTotalFollowing/" + userId);
  }
}

export default new FollowController();
