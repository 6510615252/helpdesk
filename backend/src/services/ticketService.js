const ticketRepository = require('../repositories/ticketRepository');

const VALID_STATUSES = ['pending', 'accepted', 'resolved', 'rejected'];

const getAllTickets = ({ status, sortBy } = {}) => {
    if (status && !VALID_STATUSES.includes(status)) {
        throw new Error(`Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}`);
    }
    return ticketRepository.findAll({ status, sortBy });
};

const getTicketById = (id) => {
    const ticket = ticketRepository.findById(id);
    if (!ticket) throw new Error(`Ticket id ${id} not found`);
    return ticket;
};

const createTicket = ({ title, description, contact }) => {
    if (!title?.trim())       throw new Error('Title is required');
    if (!description?.trim()) throw new Error('Description is required');
    if (!contact?.trim())     throw new Error('Contact is required');
    
    return ticketRepository.create({ 
        title: title.trim(), 
        description: description.trim(), 
        contact: contact.trim() 
    });
};

const updateTicket = (id, fields) => {
    const ticket = ticketRepository.findById(id);
    if (!ticket) throw new Error(`Ticket id ${id} not found`);

    if (fields.status && !VALID_STATUSES.includes(fields.status)) {
        throw new Error(`Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}`);
    }

    return ticketRepository.update(id, fields);
};

module.exports = { getAllTickets, getTicketById, createTicket, updateTicket };