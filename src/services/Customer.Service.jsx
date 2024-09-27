import * as URL from './const/url';

const getAllCustomers = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(URL.CUSTOMER_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
    return response.json();
}

const getCustomerById = async (id) => {
    const token = localStorage.getItem('token');
    const response = await fetch(URL.CUSTOMER_BY_ID_URL(id), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
    return response.json();
}

const updateCustomer = async (id, data) => {
    const token = localStorage.getItem('token');
    const response = await fetch(URL.CUSTOMER_BY_ID_URL(id), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

export default {
    getAllCustomers,
    getCustomerById,
    updateCustomer
};