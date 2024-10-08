import * as URL from './const/url';

const getAllNotifications = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(URL.NOTIFICATION_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
    return response.json();
}

const getNotificationById = async (id) => {
    const token = localStorage.getItem('token');
    const response = await fetch(URL.NOTIFICATION_BY_ID(id), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
    return response.json();
}

const createNotification = async (notification) => {
    const token = localStorage.getItem('token');
    const response = await fetch(URL.NOTIFICATION_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(notification)
    });
    return response.json();
}

const updateNotification = async (notification) => {
    const token = localStorage.getItem('token');
    const response = await fetch(URL.NOTIFICATION_BY_ID(notification.id), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(notification)
    });
    return response.json();
}

const deleteNotification = async (id) => {
    const token = localStorage.getItem('token');
    const response = await fetch(URL.NOTIFICATION_BY_ID(id), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
    return response;
}

const getNotificationsByVendorId = async (id) => {
    const token = localStorage.getItem('token');
    const response = await fetch(URL.NOTIFICATION_VENDOR_ID(id), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
    return response.json();
}

export default {
    getAllNotifications,
    getNotificationById,
    createNotification,
    updateNotification,
    deleteNotification,
    getNotificationsByVendorId
}

