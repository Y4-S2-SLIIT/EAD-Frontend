import * as URL from './const/url';

const getAllCategories = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(URL.CATEGORY_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    return response.json();
}

const getCategoryById = async (id) => {
    const token = localStorage.getItem('token');
    const response = await fetch(URL.CATEGORY_BY_ID_URL(id), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return response.json();
};

const createCategory = async (category) => {
    const token = localStorage.getItem('token');
    const response = await fetch(URL.CATEGORY_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(category)
    });
    return response.json();
}

const updateCategory = async (category) => {
    const token = localStorage.getItem('token');
    const response = await fetch(URL.CATEGORY_BY_ID_URL(category.id), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(category)
    });
    return response.json();
}

const deleteCategory = async (id) => {
    const token = localStorage.getItem('token');
    const response = await fetch(URL.CATEGORY_BY_ID_URL(id), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return response.json();
}

export default {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};