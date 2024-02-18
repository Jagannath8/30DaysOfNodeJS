const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = 3000;

const userSchema = new mongoose.Schema({    
    username: { type: String, required: true },
    email: { type: String, required: true },
}); 

const User = mongoose.model('User', userSchema);
mongoose.connect('mongodb://localhost:27017/30_days_node');


async function getAllUsers(req, res) {
    // Your implementation here
    try{
        const users = await User.find();
        res.status(201).send(users);
        console.log('Users:', users);
    }
    catch(err){
        console.log('Error getting users from Database!' ,err.message);
        res.status(500).send(err.message);
    }
}

app.get('/users', getAllUsers)

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});