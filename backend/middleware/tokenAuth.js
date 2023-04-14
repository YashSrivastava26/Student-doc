var jwt = require("jsonwebtoken");
const JWT_SECRET = "yjafdhHFgj33ha343s32fdsdf";

const verifyAndGetId=(req, res, next)=>{

    const token = req.header('Authorization')
    if(!token){
        res.status(401).json({error: "Access Denied"});
    }

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified.user;
    } catch (error) {
        res.status(401).json({error: "Access Denied"});
    }
    next();
}

module.exports = verifyAndGetId;