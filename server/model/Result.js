const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
    user : {
        type : String,
        required : true
    },
    quiz: [
        {
            question : {
                type : mongoose.Schema.ObjectId,
                ref : 'Question',
                required : true
            },
            userAnswer : {
                type : String
            }
        }
    ],
    score : {
        type: Number,
        required : true
    }
})

const Result = mongoose.model('Result', ResultSchema)
module.exports = Result