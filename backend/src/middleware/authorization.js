require("dotenv").config();
module.exports = (req, res, next) => {
    try {
        if (!req.session.user_id) {
            return res.status(403).json({message :"Not Authorized"});
        }
        req.user = req.session.user_id ;
        next();
    } catch (error) {
        console.error(error.message)
        return res.status(403).json({message :"Not Authorized"})

    }
}
