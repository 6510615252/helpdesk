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

/**
 * @swagger
 * components:
 *   schemas:
 *     Ticket:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         contact:
 *           type: string
 *         status:
 *           type: string
 *           enum: [pending, accepted, resolved, rejected]
 *         created_at:
 *           type: string
 *         updated_at:
 *           type: string
 */

/**
 * @swagger
 * /api/tickets:
 *   get:
 *     summary: Get all tickets
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, accepted, resolved, rejected]
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [updated_at, created_at, status]
 *     responses:
 *       200:
 *         description: List of tickets
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Ticket'
 */

/**
 * @swagger
 * /api/tickets/{id}:
 *   get:
 *     summary: Get ticket by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Ticket found
 *       404:
 *         description: Ticket not found
 */

/**
 * @swagger
 * /api/tickets:
 *   post:
 *     summary: Create a new ticket
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, description, contact]
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               contact:
 *                 type: string
 *     responses:
 *       201:
 *         description: Ticket created
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /api/tickets/{id}:
 *   patch:
 *     summary: Update a ticket
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               contact:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [pending, accepted, resolved, rejected]
 *     responses:
 *       200:
 *         description: Ticket updated
 *       404:
 *         description: Ticket not found
 */