import * as URL from './const/url';
const token = localStorage.getItem('token');

const addProduct = async (product) => {
    const response = await fetch(URL.PRODUCT_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(product)
    });
    return response.json();
}

const getAllProducts = async () => {
    const response = await fetch(URL.PRODUCT_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
    return response.json();
}

const getProductsByVendorId = async (id) => {
    const response = await fetch(URL.GET_PRODUCT_BY_VENDORID(id), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
    return response.json();
}

const getProductById = async (id) => {
    const response = await fetch(URL.PRODUCT_BY_ID(id), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
    return response.json();
}

const deleteProduct = async (id) => {
    const response = await fetch(URL.PRODUCT_BY_ID(id), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
    return response.json();
}

const updateProduct = async (id, product) => {
    const response = await fetch(URL.PRODUCT_BY_ID(id), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(product)
    });
    return response.json();
}

export default {
    addProduct,
    getAllProducts,
    getProductsByVendorId,
    deleteProduct,
    updateProduct,
    getProductById
};