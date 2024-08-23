const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const userSchema = Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
}, { timestamps: true });

userSchema.methods.toJSON = function () {
    const obj = this._doc;
    delete obj.password;
    return obj;
}

//사용자 정의 함수를 만들 수 있다.
//아래는 토큰 생성 함수
userSchema.methods.generateToken = function () {
    const token = jwt.sign({ _id: this._id }, JWT_SECRET_KEY, {expiresIn: '1d'}); //expiresIn: 토큰 유통기한/ id=하루
    const splitToken = token.split('.', 1);
    return splitToken;
}

const User = mongoose.model('User', userSchema);

module.exports = User;