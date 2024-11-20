const express = require('express');
const {
    addTicket,
    getTickets,
    deleteTicket,
    updateTicket,
    getTicketById,
    searchTickets
} = require('../controllers/TicketManagementController');
// const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Apply authentication middleware to all routes
// router.use(authMiddleware);

// Route to add a new ticket
router.post('/', addTicket);

// Route to get all tickets created by the authenticated user
router.get('/', getTickets);

// Route to search tickets
router.get('/search', searchTickets);

// Route to get a specific ticket by ID
router.get('/:id', getTicketById);

// Route to update a specific ticket by ID
router.put('/:id', updateTicket);

// Route to delete a specific ticket by ID
router.delete('/:id', deleteTicket);

module.exports = router;
