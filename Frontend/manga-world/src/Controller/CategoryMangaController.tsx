import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/";

class CategoryMangaController {
  addCategoryManga(categoryManga: any) {
    return axios.post(
      USER_API_BASE_URL + "categoryMangas/addCategoryManga",
      categoryManga
    );
  }
}

export default new CategoryMangaController();
