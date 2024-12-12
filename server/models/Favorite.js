const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = mongoose.Schema({
    userFrom: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    movieId: {
        type: String
    },
    movieTitle: {
        type: String
    },
    moviePost: {
        type: String,
    },
    movieRunTime: {
        type: String,
    },    
}, { timestamps: true })

const Favorite = mongoose.model('Favorite', favoriteSchema)

// 다른곳에서 사용할 수 있도록 함
module.exports = { Favorite }
