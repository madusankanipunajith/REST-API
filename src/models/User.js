const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)) throw new Error('Email is not valid');
        }

    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if(value < 0 ) throw new Error('Age should be positive');
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value){
            //if(value.length <=6) throw new Error('Password length should be > 6');
            if(value.includes('password')) throw new Error('You cant use this password');
        }
    }
})


userSchema.statics.findByCredentials = async(email, password) => {
    
    
    const user = await User.findOne({email});
    if(!user){
        throw new Error({error: 'Unable to Login'})
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        throw new Error({error: 'Unable to Login'})
    }

    return user;
}

userSchema.pre('save', async function(next){

    const user = this;
    console.log('password has been hashed just before saving...');
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;