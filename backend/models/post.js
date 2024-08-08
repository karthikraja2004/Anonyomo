const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    upvotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    category: {
        type: String,
        enum: ["Issues", "Academics", "Updates", "Career", "Misc"],
        default: "Misc"
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
}, {
    collection: 'posts',
    timestamps: true
})
module.exports = mongoose.model('post', postSchema)