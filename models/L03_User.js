const mongoose = require('mongoose');

const userschema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true, // trim: 스페이스 없애주는 역할 ex)he llo->hello
        unique: 1 // 같은 email 존재 못하도록
    },
    password: {
        type: String
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token:{ // 유효성 관리
        type: String
    },
    tokenExp: {
        type: Number
    }
})

const User = mongoose.model('User', userschema)

module.exports = { User };
