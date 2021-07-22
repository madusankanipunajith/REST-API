require('./db/mongodb');
const express = require('express');

const userRouter = require('./routers/User');
const taskRouter = require('./routers/Task');

const app = express();

const port = process.env.PORT || 8080;

app.use(express.json());

app.use(userRouter);
app.use(taskRouter);







app.listen(port, ()=>{
    console.log('Server is up on port '+port);
})