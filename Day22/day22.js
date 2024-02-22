const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');

function connectToMongoDB() {
    // Your implementation here
    mongoose.connect('mongodb://localhost:27017/30_days_node');
    const db = mongoose.connection;

    db.on('error', (err) => {
        console.error('MongoDB connection error:', err.message);
        process.exit(1);
    });

    db.once('open', () => {
        console.log('Connected to MongoDB');
    });
}

connectToMongoDB();

const productSchema = new mongoose.Schema({
    name: { type: String, required: true},
    price: { type: Number, required: true},
    quantity: { type: Number, required: true}
});

const Product = mongoose.model('Product', productSchema);

async function createProduct(product) {
    // Your implementation here
    try{
        const newProduct = new Product(product);
        const result = await newProduct.save();
        console.log('Product created:', result);
    }
    catch(err){
        console.error('Error creating product:', err.message);
    }
}
  
async function getAllProducts() {
    // Your implementation here
    try{
        const products = Product.find();
        console.log('All Products:', products);
        return products;
    }
    catch(err){
        console.error('Error getting products:', err.message);
        return [];
    }
}
  
async function updateProduct(productId, updatedProduct) {
    // Your implementation here
    try{
        const product = Product.findById(productId, updateProduct, {new: true});
        if(!product){
            console.error('Product not found');
            return;
        }
        product.name = updatedProduct.name;
        product.price = updatedProduct.price;
        product.quantity = updatedProduct.quantity;
        const result = await product.save();
        console.log('Product updated:', result);
    }
    catch(err){
        console.error('Error updating product:', err.message);
    }
}

async function deleteProduct(productId) {
    // Your implementation here
    try{
        const deleteProduct = Product.findByIdAndDelete(productId);
        if(!deleteProduct){
            console.error('Product not found');
            return;
        }
        console.log('Product deleted:', deleteProduct);
    }
    catch(err){
        console.error('Error deleting product:', err.message);
    }
}

async function main() {
    await createProduct({name: 'Laptop', price: 70000, quantity: 10});
    await createProduct({name: 'Mobile', price: 20000, quantity: 20});
    await createProduct({name: 'Tablet', price: 40000, quantity: 15});
    const allProducts = await getAllProducts();
    await updateProduct(allProducts[0]._id, {price: 75000, quantity: 12});
    await deleteProduct(allProducts[1]._id);
    await mongoose.disconnect();
}

main();