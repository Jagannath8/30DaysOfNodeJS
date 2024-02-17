const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({    
    username: { type: String, required: true },
    email: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);
mongoose.connect('mongodb://localhost:27017/30_days_node');

async function addUserToDatabase(user) {
    // Your implementation here
    try{
        const newUser = new User(user);
        await newUser.save();
        console.log('User added successfully!');
    }
    catch(err){
        console.log('Error adding user to Database!' ,err.message);
    }
}

addUserToDatabase({ username: 'John', email: 'john@example.comm' });