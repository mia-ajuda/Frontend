import api from '../services/Api';

class CategoryService {
    constructor() {}

    async getAllCategories() {
        const categories = await api.get('/category');
        return categories.data;
    }
}

const categoryService = new CategoryService();
Object.freeze(categoryService);

export default categoryService;
