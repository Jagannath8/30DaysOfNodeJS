const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


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
});

const Product = mongoose.model('Product', productSchema);

app.use(bodyParser.json());


async function createProductRoute(req, res) {
    // Your implementation here
    try{
        const product = new Product(req.body);
        product.save();
        res.status(201).json(product);
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
}
  
async function getAllProductsRoute(req, res) {
    // Your implementation here
    try{
        const products = await Product.find(req.query);
        res.status(200).json(products);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}
  
async function updateProductRoute(req, res) {
    // Your implementation here
    try{
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
          });
          if (!product) {
            return res.status(404).json({ message: "Product not found." });
          }
          res.status(200).json(product);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}
  
async function deleteProductRoute(req, res) {
    // Your implementation here
    try{
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found." });
          }
          res.status(200).json({ message: "Product deleted successfully." });
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}

app.post('/products', createProductRoute);
app.get('/products', getAllProductsRoute);
app.put('/products/:id', updateProductRoute);
app.delete('/products/:id', deleteProductRoute);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});