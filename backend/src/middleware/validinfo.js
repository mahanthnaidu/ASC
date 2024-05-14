module.exports = (req, res, next) => {
    const { ID, hashed_password } = req.body;

    function validid(userid) {
        return userid.length <= 5;
    }
    // remove this as this is for register no need 
    if (req.path == "/register") {
        if (![ID, hashed_password].every(Boolean)) {
            return res.status(401).json({message :"Missing Credentials"});
        } else if (!validid(ID)) {
            return res.status(401).json("Invalid ID");
        }
    }
    if (req.path == "/login") {
        if (![ID, hashed_password].every(Boolean)) {
            return res.status(401).json({message :"Missing credentials"});
        } else if (!validid(ID)) {
            return res.status(401).json({message :"Invalid Id"});
        }
    }
    next();
};