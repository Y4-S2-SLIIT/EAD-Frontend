import * as URL from './const/url';
const token = localStorage.getItem('token');

const getAllCategories = async () => {
    const response = await fetch(URL.CATEGORY_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
    return response.json();
}

export default {
    getAllCategories
};