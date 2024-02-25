const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/30_days_node');
const db = mongoose.connection;
db.on('error', (err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
});

db.once('open', () => {
    console.log('Connected to MongoDB');
});


const productSchema = new mongoose.Schema({
    name: { type: String, required: true},
    description: { type: String},
    price: { type: Number, required: true},
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category'}
});

const Product = mongoose.model('Product', productSchema);

async function createProductNameIndex() {
    // Your implementation here
    await Product.collection.createIndex({name: 1}, (err, result) => {
        if(err) 
            console.error('Error creating index: ', err);
        else 
            console.log('Index created successfully!', result);
    });
}

app.get('/createIndex', (req, res) => {
    createProductNameIndex();
    res.send('Index creation started');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});