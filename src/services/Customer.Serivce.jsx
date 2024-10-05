import * as URL from './const/url';

const getAllCustomers = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(URL.GET_CUSTOMER_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    return response.json();
}

const getCustomerById = async (id) => {
    const token = localStorage.getItem('token');
    const response = await fetch(URL.GET_CUSTOMER_BY_ID_URL(id), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return response.json();
};

const updateCustomer = async (id, customer) => {
    const token = localStorage.getItem('token');
    const response = await fetch(URL.GET_CUSTOMER_BY_ID_URL(id), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(customer)
    });
    return response.json();
}

const deleteCustomer = async (id) => {
    const token = localStorage.getItem('token');
    const response = await fetch(URL.GET_CUSTOMER_BY_ID_URL(id), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return response.json();
}

const verifyCustomer = async (id) => {
    const token = localStorage.getItem('token');
    const response = await fetch(URL.CUSTOMER_CUSTOM_URL(id, 'verify'), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return response.json();
}

const deactivateCustomer = async (id) => {
    const token = localStorage.getItem('token');
    const response = await fetch(URL.CUSTOMER_CUSTOM_URL(id, 'deactivate'), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return response.json();
}

const activateCustomer = async (id) => {
    const token = localStorage.getItem('token');
    const response = await fetch(URL.CUSTOMER_CUSTOM_URL(id, 'activate'), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return response.json();
}

export default {
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
    verifyCustomer,
    deactivateCustomer,
    activateCustomer
}