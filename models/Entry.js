const mongoose = require('mongoose');

const Entry = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    school: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    companies: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    job: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
});

module.exports = mongoose.model('entry', Entry);

