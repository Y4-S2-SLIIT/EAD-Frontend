import * as URL from './const/url';

const login = async (username, password) => {
    const response = await fetch(URL.AUTH_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });
    return response.json();
}

const getAllUsers = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(URL.GET_USER_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });
    return response.json();
}

const getUserById = async (id) => {
    const token = localStorage.getItem('token');
    const response = await fetch(URL.GET_USER_BY_ID_URL(id), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
    return response.json();
}

export default {
    login,
    getAllUsers,
    getUserById
};