import api from "../services/Api";

class CategoryService {
  constructor() {}

  async getAllCategories() {
    try {
      const categories = await api.get("/category");
      return categories.data;
    } catch (error) {
      console.log(error.data);
    }
  }
}

const categoryService = new CategoryService();
Object.freeze(categoryService);

export default categoryService;
