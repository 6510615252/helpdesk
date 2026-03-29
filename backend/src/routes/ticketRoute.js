const express = require('express');
const router = express.Router();
const ticketService = require('../services/ticketService');

router.get('/', (req, res) => {
    try {
        const { status, sortBy } = req.query;
        const tickets = ticketService.getAllTickets({ status, sortBy });
        res.json({ success: true, data: tickets });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

router.get('/:id', (req, res) => {
    try {
        const ticket = ticketService.getTicketById(Number(req.params.id));
        res.json({ success: true, data: ticket });
    } catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
});

router.post('/', (req, res) => {
    try {
        const ticket = ticketService.createTicket(req.body);
        res.status(201).json({ success: true, data: ticket });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

router.patch('/:id', (req, res) => {
    try {
        const ticket = ticketService.updateTicket(Number(req.params.id), req.body);
        res.json({ success: true, data: ticket });
    } catch (error) {
        const status = error.message.includes('not found') ? 404 : 400;
        res.status(status).json({ success: false, message: error.message });
    }
});

module.exports = router;