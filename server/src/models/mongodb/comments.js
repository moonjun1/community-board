const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    post_id: { type: Number, required: true },
    user_id: { type: Number, required: true },
    content: { type: String, required: true },
    parent_id: { type: mongoose.Schema.Types.ObjectId, default: null },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', commentSchema);