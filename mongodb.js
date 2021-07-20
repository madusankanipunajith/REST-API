const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb+srv://textile_management:textile_management_123@cluster0.gsmsq.mongodb.net/task-manager-api?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('Connected...');
}).catch(()=>{
    console.log('cant connect to the database...');
})

const User = mongoose.model('User',{
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

const me = new User({
    name : 'Nipunajith',
    email : 'madu@gmail.com',
    age: 23,
    password: 'Madu@12345678'
})

me.save().then((x)=>{
    console.log(x)
}).catch((error)=>{
    console.log("Can't added user", error);
})