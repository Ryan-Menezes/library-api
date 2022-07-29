const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    visible: {
        type: Boolean,
        default: true,
    },
    isbn: {
        type: String,
        required: true,
    },
    volume: {
        type: Number,
        required: true,
    },
    edition: {
        type: Number,
        required: true,
    },
    pages: {
        type: Number,
        required: true,
    },
    language: {
        type: String,
        default: 'English',
    },
    release_date: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
        default: null,
    },
    details: {
        type: String,
        default: null,
    },
    poster: {
        type: String,
        default: null,
    },
    images: [
        {
            type: String
        }
    ],
    categories: [
        {
            type: Schema.Types.ObjectId,
            ref: 'categories',
        }
    ],
    authors: [
        {
            type: Schema.Types.ObjectId,
            ref: 'authors',
        }
    ],
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
});

module.exports = mongoose.model('Book', BookSchema);
