import * as URL from './const/url';

const getAllOrders = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(URL.ORDER_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
    return response.json();
}

const getOrderById = async (id) => {
    const token = localStorage.getItem('token');
    const response = await fetch(URL.ORDER_BY_ID(id), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
    return response.json();
}

const updateOrder = async (id, order) => {
    const token = localStorage.getItem('token');
    const response = await fetch(URL.ORDER_BY_ID(id), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(order)
    });
    return response.json();
}

const deleteOrder = async (id) => {
    const token = localStorage.getItem('token');
    const response = await fetch(URL.ORDER_BY_ID(id), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
    return response.json();
}

const getOrdersByVendorId = async (vendorId) => {
    const token = localStorage.getItem('token');
    const response = await fetch(URL.ORDER_BY_VENDOR_ID(vendorId), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
    return response.json();
}

const updateVendorOrderStatus = async (orderId, vendorId, status) => {
    const token = localStorage.getItem('token');
    const response = await fetch(URL.ORDER_UPDATE_VENDOR_STATUS(orderId, vendorId, status), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
    });
    return response.json();
}

export default {
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
    getOrdersByVendorId,
    updateVendorOrderStatus
}