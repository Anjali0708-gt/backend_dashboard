const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    stage: { type: String, enum: ['cutting', 'stitching', 'finishing', 'pressing'], required: true },
    status: { type: String, enum: ['pending', 'in_progress', 'done'], default: 'pending' },
    deadline: { type: Date },
    completedAt: { type: Date },
    notes: { type: String },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  },
  { timestamps: true }
);

taskSchema.index({ assignedTo: 1, status: 1 });
taskSchema.index({ orderId: 1 });

module.exports = mongoose.model('Task', taskSchema);