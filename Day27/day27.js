const express = require('express');
const app = express();
const port = 4000;
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'day27_secret_key';
app.use(express.json());

const users = [
    {id: 1, username: 'admin', password: 'admin', role: 'admin'},
    {id: 2, username: 'user', password: 'user', role: 'user'}
]

app.post('/login', (req, res) => {
    const {username, password} = req.body;
    const user = users.find((u) => u.username === username && u.password === password);
    if(user){
        const token = jwt.sign({id: user.id, username: user.username, role: user.role},
                                JWT_SECRET, {expiresIn: '1h'});
        res.json({token});
    }
    else{
        res.status(401).json({message: 'Invalid credentials!'});
    }
});

function authenticateAndAuthorize(requiredRoles) {
    return (req, res, next) => {
        // Your implementation here
        const authHeader = req.headers.authorization;
        if(!authHeader) {
            return res.status(401).send('Unauthorized user!');
        }

        const token = authHeader.split(' ')[1];
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if(err){
                return res.status(401).json({message: 'Invalid token!'});
            }
            else{
                const user = users.find(u => u.id === decoded.id);
                if(!user){
                    return res.status(401).json({message: 'User not found!'});
                }
                else{
                    if(requiredRoles && user.role !== requiredRoles){
                        return res.status(403).json({message: 'Insufficient permissions!'});
                    }
                    req.user = user;
                    next();
                }
            }
        });
    }
}

app.get('/admin', authenticateAndAuthorize('admin'), (req, res) => {
    res.send('Admin route');
});

app.get('/user', authenticateAndAuthorize('user'), (req, res) => {  
    res.send('User route accessed');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});