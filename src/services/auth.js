// const sessionIdToUsermap = new Map();
const jwt = require('jsonwebtoken');
const secret = 'Samiksha$123';

function setUser(user) {
    return jwt.sign(
        {
            _id: user._id,
            email: user.email,
            
        },
        secret, 
        { expiresIn: '1h' }
    );
}

function getUser(token) {
    try {
        // Replace 'your_jwt_secret' with your actual secret
        const user = jwt.verify(token, secret);
        return user;
    } catch (err) {
        console.error('Error decoding token:', err);
        return null;
    }
}

module.exports = {
    getUser,
};

module.exports = {
    setUser,
    getUser,
    secret
}