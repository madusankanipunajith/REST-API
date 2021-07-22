const express = require('express');
const User = require('../models/User');
const router = new express.Router();

/**app.post('/users', (req, res)=>{
    const user = new User(req.body);

    user.save().then(()=>{
        res.status(201).send(user);
    }).catch((e)=>{
        res.status(400).send(e);
    })
}) */


router.post('/users', async(req, res)=>{
    const user = new User(req.body)

    try{
        await user.save();
        res.status(201).send(user);
    }catch(e){
        res.status(400).send(e);
    }
})

router.post('/users/login', async (req,res)=>{

    try{
        const user = await User.findByCredentials(req.body.email, req.body.password);
        res.send(user);
    }catch(e){
        res.status(500).send(e);
    }
})
/**app.get('/users', (req, res)=>{

    User.find({}).then((users)=>{
        res.send(users);
    }).catch((e)=>{
        res.status(500).send('Internal error');
    })
}) */

router.get('/users', async(req, res)=>{

    try{
        const users = await User.find({});
        res.send(users);
    }catch(e){
        res.status(500).send('Internal error');
    }
})

/**app.get('/users/:id', (req, res)=>{

    const _id = req.params.id;
    User.findById((_id)).then((user)=>{
        if(!user){
            return res.send('no user is found');
        }

        res.status(200).send(user);
    }).catch((error)=>{

        res.status(500).send('Internal error');
    })
}) */

router.get('/users/:id', async(req, res)=>{
    const _id = req.params.id;

    try{
        const user = await User.findById((_id));
        if(!user){
            return res.status(404).send('no user is found');
        }
        res.status(200).send(user);

    }catch(e){
        res.status(500).send('Internal error');
    }
})

router.patch('/users/:id', async(req,res)=>{
    const _id = req.params.id;
    const updates = Object.keys(req.body);
    const allowdUpdates = ['name', 'age', 'email', 'password'];

    const isAllowd = updates.every((update)=> allowdUpdates.includes(update))

    if(!isAllowd){
        return res.status(400).send({error: 'Invalid updates'});
    }

    try{
        //const user = await User.findByIdAndUpdate( _id, req.body, {new: true, runValidators: true});
        const user = await User.findById(_id);
        updates.forEach((update)=>{
            user[update] = req.body[update];
        })


        if(!user){
            return res.status(404).send();
        }

        await user.save()

        res.status(200).send(user);
    }catch(e){
        res.status(500).send('Internal error');
    }
})

router.delete('/users/:id', async(req, res)=>{

    try{
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user){
            return res.status(404).send();
        }
        res.status(200).send(user)
    }catch(e){
        res.status(500).send('Internal error');
    }
})




module.exports = router;