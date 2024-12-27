const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    user_id: { type: Number, required: true },
    type: { type: String, required: true },
    content: { type: String, required: true },
    is_read: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notification', notificationSchema);