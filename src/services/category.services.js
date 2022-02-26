import axios from 'axios';
class CategoryServices {
    async getCategories() {
        let res = await axios.get(`http://localhost:3001/categories?_sort=id&_order=desc`);
        return res.data;
    }
}

export default new CategoryServices();