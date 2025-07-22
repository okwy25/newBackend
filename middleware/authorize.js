const jwt = require('jsonwebtoken');

const authorize = (allowedRoles) => (req,res,next)=>{
    const token = req.headers.authorization?.split(' ')[1];
    if(!token) return res.status(403).send('Access denied. No token provided.');

    try{
        const decoded = jwt.verify(token, process.env.SECRETKEY);
        req.user = decoded;
        console.log('Decoded token:',decoded);
        if(!allowedRoles.includes(req.user.role)){
            return res.state(403).send('Access denied. Insufficient permissions.');
        }

        next();
    } catch (err){
        console.log('Token verification error:', err.message);
        if(err.name === 'TokenExpiredError'){
            return res.status(401).send('Token expired.');
        } else if(err.name === 'JsonWebTokenError'){
            return res.status(401).send('Invalid token.');
        }
        res.status(400).send('Internal server error.');
    }
};

module.exports = authorize;