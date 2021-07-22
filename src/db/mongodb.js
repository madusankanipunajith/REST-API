const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://textile_management:textile_management_123@cluster0.gsmsq.mongodb.net/task-manager-api?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(()=>{
    console.log('Connected...');
}).catch(()=>{
    console.log('cant connect to the database...');
})



/**const me = new User({
    name : 'Nipunajith',
    email : 'madu@gmail.com',
    age: 23,
    password: 'Madu@12345678'
})

me.save().then((x)=>{
    console.log(x)
}).catch((error)=>{
    console.log("Can't added user", error);
}) */