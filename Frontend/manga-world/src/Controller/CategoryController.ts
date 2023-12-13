import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/";

class CategoryController {
  allCategories() {
    return axios.get(USER_API_BASE_URL + "allCategories");
  }
  addNewCategory(category: any) {
    return axios.post(
      USER_API_BASE_URL + "categories/addNewCategory",
      category
    );
  }
}

export default new CategoryController();
