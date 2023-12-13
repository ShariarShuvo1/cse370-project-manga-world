import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/";

class WishlistController {
  currentStatusChecker(wishlist: any) {
    return axios.post(USER_API_BASE_URL + "currentStatusChecker", wishlist);
  }

  addToWishList(wishlist: any) {
    return axios.post(USER_API_BASE_URL + "addToWishList", wishlist);
  }

  addToOngoing(wishlist: any) {
    return axios.post(USER_API_BASE_URL + "addToOngoing", wishlist);
  }

  addToAlreadyRead(wishlist: any) {
    return axios.post(USER_API_BASE_URL + "addToAlreadyRead", wishlist);
  }

  removeAllInterest(wishlist: any) {
    return axios.post(USER_API_BASE_URL + "removeAllInterest", wishlist);
  }

  getAllOngoing(userId: any, pageNumber: number) {
    return axios.get(
      USER_API_BASE_URL + "getAllOngoing/" + userId + "/" + pageNumber
    );
  }

  getAllAlreadyRead(userId: any, pageNumber: number) {
    return axios.get(
      USER_API_BASE_URL + "getAllAlreadyRead/" + userId + "/" + pageNumber
    );
  }

  getAllWishlist(userId: any, pageNumber: number) {
    return axios.get(
      USER_API_BASE_URL + "getAllWishlist/" + userId + "/" + pageNumber
    );
  }

  getTotalOnGoing(userId: any) {
    return axios.get(USER_API_BASE_URL + "getTotalOnGoing/" + userId);
  }

  getTotalAlreadyRead(userId: any) {
    return axios.get(USER_API_BASE_URL + "getTotalAlreadyRead/" + userId);
  }

  getTotalWishlist(userId: any) {
    return axios.get(USER_API_BASE_URL + "getTotalWishlist/" + userId);
  }

  deleteOngoing(ongoing: any) {
    return axios.post(USER_API_BASE_URL + "deleteOngoing", ongoing);
  }
  deleteAlreadyRead(alreadyList: any) {
    return axios.post(USER_API_BASE_URL + "deleteAlreadyRead", alreadyList);
  }

  deleteWishlist(wishlist: any) {
    return axios.post(USER_API_BASE_URL + "deleteWishlist", wishlist);
  }
}

export default new WishlistController();
