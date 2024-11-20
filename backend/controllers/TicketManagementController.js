const Ticket = require('../models/Ticket');

// Add a ticket
exports.addTicket = async (req, res) => {
  try {
    // const { email } = req.user; // Fetch the logged-in user's email from the request

    const ticket = await Ticket.create({
      ...req.body,
      createdBy: "maheswari" // Set the user ID who created the ticket

    });

    res.status(201).json(ticket);
  } catch (err) {
    console.error('Error adding ticket:', err);
    res.status(500).json({ error: 'Failed to add ticket.' });
  }
};

// Get all tickets created by the logged-in user
exports.getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ createdBy: req.user.id });
    res.status(200).json(tickets);
  } catch (err) {
    console.error('Error fetching tickets:', err);
    res.status(500).json({ error: 'Failed to fetch tickets.' });
  }
};

// Update a ticket
exports.updateTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found.' });
    }
    if (ticket.createdBy.toString() !== req.user.id.toString()) {
      return res.status(403).json({ error: 'Unauthorized action.' });
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedTicket);
  } catch (err) {
    console.error('Error updating ticket:', err);
    res.status(500).json({ error: 'Failed to update ticket.' });
  }
};

// Delete a ticket
exports.deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found.' });
    }
    if (ticket.createdBy.toString() !== req.user.id.toString()) {
      return res.status(403).json({ error: 'Unauthorized action.' });
    }

    await Ticket.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Ticket deleted successfully.' });
  } catch (err) {
    console.error('Error deleting ticket:', err);
    res.status(500).json({ error: 'Failed to delete ticket.' });
  }
};

// Get a single ticket by ID
exports.getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found.' });
    }
    if (ticket.createdBy.toString() !== req.user.id.toString()) {
      return res.status(403).json({ error: 'Unauthorized access to ticket.' });
    }

    res.status(200).json(ticket);
  } catch (err) {
    console.error('Error fetching ticket by ID:', err);
    res.status(500).json({ error: 'Failed to fetch ticket.' });
  }
};

// Search tickets by title, status, or priority
exports.searchTickets = async (req, res) => {
  try {
    const { term } = req.query; // Extract the search term from query parameters

    if (!term) {
      return res.status(400).json({ error: 'Search term is required.' });
    }

    const searchQuery = {
      $or: [
        { title: { $regex: term, $options: 'i' } }, // Case-insensitive match for title
        { status: { $regex: term, $options: 'i' } }, // Case-insensitive match for status
        { priority: { $regex: term, $options: 'i' } }, // Case-insensitive match for priority
      ],
    };

    const tickets = await Ticket.find(searchQuery);
    res.status(200).json(tickets);
  } catch (err) {
    console.error('Error searching tickets:', err);
    res.status(500).json({ error: 'Failed to search tickets.' });
  }
};
