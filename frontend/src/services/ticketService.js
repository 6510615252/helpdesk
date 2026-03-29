import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/tickets';

export const getAllTickets = async ({ status, sortBy } = {}) => {
    const params = {};
    if (status) params.status = status;
    if (sortBy) params.sortBy = sortBy;
    
    const res = await axios.get(BASE_URL, { params });
    return res.data.data;
};

export const getTicketById = async (id) => {
    const res = await axios.get(`${BASE_URL}/${id}`);
    return res.data.data;
};

export const createTicket = async ({ title, description, contact }) => {
    const res = await axios.post(BASE_URL, { title, description, contact });
    return res.data.data;
};

export const updateTicket = async (id, fields) => {
    const res = await axios.patch(`${BASE_URL}/${id}`, fields);
    return res.data.data;
};