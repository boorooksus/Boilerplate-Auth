const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10; // salt의 길이(salt는 암호화에 이용됨)

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
});

// mongoose method: save하기 전에 실행
userschema.pre('save', function (next) {

    var user = this;
    // password 변경시에만 암호화 하도록함. 이메일이나 이름 수정 할때에는 비밀번호 암호화 다시 안함
    if(user.isModified('password')){
        // 비밀번호 암호화
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)
            
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return(err)
                // Store hash in your password DB.
                // password를 hash된 비밀번호로 바꿔줌
                user.password = hash
                next()
            });
        });
    }else{
        next()
    }
});

const User = mongoose.model('User', userschema)

module.exports = { User };