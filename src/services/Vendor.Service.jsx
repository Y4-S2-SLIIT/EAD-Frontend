import * as URL from './const/url';

const login = async (username, password) => {
    const response = await fetch(URL.VENDOR_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });
    return response.json();
}

const register = async (vendor) => {
    const response = await fetch(URL.VENDOR_REGISTER_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(vendor)
    });
    return response.json();
}

const getAllVendors = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(URL.GET_VENDOR_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    return response.json();
}

const getVendorById = async (id) => {
    const token = localStorage.getItem('token');
    const response = await fetch(URL.GET_VENDOR_BY_ID_URL(id), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return response.json();
};

const updateVendor = async (vendor) => {
    const token = localStorage.getItem('token');
    const response = await fetch(URL.GET_VENDOR_BY_ID_URL(vendor.id), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(vendor)
    });
    return response.json();
}

const deleteVendor = async (id) => {
    const token = localStorage.getItem('token');
    const response = await fetch(URL.GET_VENDOR_BY_ID_URL(id), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return response.json();
}

export default {
    login,
    register,
    getAllVendors,
    getVendorById,
    updateVendor,
    deleteVendor
};