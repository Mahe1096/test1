const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Title or subject of the ticket
  description: { type: String, required: true }, // Detailed description of the issue
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Resolved', 'Closed'],
    default: 'Open'
  }, // Status of the ticket
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default: 'Medium'
  }, // Priority level
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }, // Reference to the user who created the ticket
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }, // Reference to the user assigned to resolve the ticket
  department: {
    type: String,
    required: true
  }, // Department handling the issue
  dueDate: { type: Date }, // Expected resolution date
  resolution: { type: String }, // Description of the resolution
}, { timestamps: true }); // Automatically adds createdAt and updatedAt

module.exports = mongoose.model('Ticket', TicketSchema);
