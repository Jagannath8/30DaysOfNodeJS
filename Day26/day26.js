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
    quantity: { type: Number, required: true},
});

const Product = mongoose.model('Product', productSchema);

async function getProductStatistics() {
    // Your implementation here
    try {
        const stats = await Product.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: 1 },
                    totalProducts: { $sum: 1 },
                    averagePrice: { $avg: '$price' },
                    highestQuantity: { $max: '$quantity' }
                }
            }
        ]);
        return stats;
    }
    catch(err) {
        console.error('Error getting product statistics: ', err);
    }
}

try{
    getProductStatistics().then((stats) => {
        console.log(stats);
    });
}
catch(err) {
    console.error('Error getting product statistics: ', err);
}