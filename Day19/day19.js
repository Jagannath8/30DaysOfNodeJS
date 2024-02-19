const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({    
    username: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        validate: {
            validator: (v) => {
                return /^([\w-\.]+@([\w-]+\.)+[\w-])?$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
});

function addUserWithValidation(user) {
    // Your implementation here
    const newUser = new User(user);
    newUser.save().then((result) => {
        console.log('User saved successfully!', result);
    }).catch((err) => {
        console.log('Error saving user to Database!', err.message);
    });
}

const User = mongoose.model('User', userSchema);
mongoose.connect('mongodb://localhost:27017/30_days_node').then(() => {
    console.log('Connected to Database!');
    addUserWithValidation({username: 'john_doe', email: 'invalid-email'});
}).catch((err) => {
    console.log('Error connecting to Database!', err.message);
});