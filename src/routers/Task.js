const express = require('express');
const Task = require('../models/Task');
const router = new express.Router();

/**app.post('/tasks',(req, res)=>{
    const task = new Task(req.body);

    task.save().then(()=>{
        res.status(201).send(task);
    }).catch((e)=>{
        res.status(400).send(e)
    })
}) */

router.post('/tasks', async(req, res)=>{
    const task = new Task(req.body);

    try{
        await task.save();
        res.status(201).send(task);
    }catch(e){
        res.status(400).send(e);
    }
})



router.patch('/tasks/:id', async(req, res)=>{
    const _id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];

    const isAllowed = updates.every((update)=> allowedUpdates.includes(update))

    if(!isAllowed){
        return res.status(400).send({error: 'Invalid updates'})
    }

    try{
        const task = await Task.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true});
        if(!task){
            return res.status(404).send();
        }

        res.status(200).send(task);
    }catch(e){
        res.status(500).send('Internal error');
    }
})



module.exports = router;