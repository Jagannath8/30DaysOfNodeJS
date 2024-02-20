const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();
const port = 3000;

const mongoURI = 'mongodb://localhost:27017/30_days_node';


async function averageAgeOfUsers(req, res) {
    // Your implementation here
    try{
        const client = new MongoClient(mongoURI);
        const db = client.db('30_days_node');
        const users = db.collection('users');
        const result = await users.aggregate([
            {
                $group: {
                    _id: null,
                    averageAge: { $avg: '$age' }
                }
            }
        ]).toArray();

        await client.connect();
        const averageAge = result[0].averageAge;
        res.json({ averageAge });
    }

    catch(err){
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

app.get('/average-age', averageAgeOfUsers)

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});