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

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true},
    description: { type: String, required: true}
});

const productSchema = new mongoose.Schema({
    name: { type: String, required: true},
    price: { type: Number, required: true},
    quantity: { type: Number, required: true},
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category'}
});

const Category = mongoose.model('Category', categorySchema);
const Product = mongoose.model('Product', productSchema);

async function ProductWithCategory() {
    // Your implementation here
    const categoryElectronics = await Category.create({
        name: 'Electronics',
        description: 'Electronic products'
    });
    
    const categoryClothing = await Category.create({    
        name: 'Clothing',
        description: 'Clothing products'
    });

    const product1 = await Product.create({ 
        name: 'Laptop',
        price: 70000,
        quantity: 10,
        category: categoryElectronics._id
    });

    const product2 = await Product.create({
        name: 'T-shirt',
        price: 800,
        quantity: 30,
        category: categoryClothing._id
    });

    product1.category = categoryElectronics;
    product2.category = categoryClothing;
}

function getProductsPopulatedWithCategory() {
    // Your implementation here
    try{
        const products = Product.find().populate('category');
        console.log('All Products:', products);
        return products;
    }
    catch(err){
        console.error('Error getting products:', err.message);
        return [];
    }
}

ProductWithCategory()
getProductsPopulatedWithCategory();