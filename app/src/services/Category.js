import api from "../services/Api";

class CategoryService {
  constructor() {}

  async getAllCategories() {
    const categories = await api.get("/category");
    return categories.data;
  }
  catch(error) {
    console.log(error.data);
  }
}

export default categoryService;
