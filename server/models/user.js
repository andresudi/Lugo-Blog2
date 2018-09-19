const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')
const uniqueValidator = require('mongoose-unique-validator');

var userSchema = new Schema ({
    name: {
        type: String,
        require: [true, 'name is required']
    },
    email: {
        type: String,
        unique: [true, 'email is already in use'],
        index: true,
        required: true,
        trim: true,
        lowercase: true,
        uniqueCaseInsensitive: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        required: [true, 'email is required']
    },
    password: {
        type: String,
        require: [true, 'password is required'],
        minlength: 6
    }
}, {
    timestamps: true
})

userSchema.plugin(uniqueValidator);

userSchema.pre('save', function(next) {
    let saltRound = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(this.password, saltRound)
    this.password = hash
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User