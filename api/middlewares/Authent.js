// For the JSON Web Token Authentication
const {verify } = require('jsonwebtoken');

// Intermediary validation function
const validateTheToken = (req, res, next) =>{

    const accessToken = req.header("accessToken");

    if (!accessToken){
        return res.json({error: "No user is logged in!"})
    }
    else{

        try {
            const validTokenito = verify(accessToken, process.env.JWT_SECRET);
            if(validTokenito){
                req.user = validTokenito;
                return next();
            }
        } catch (error) {
            return res.json({error: error});
        }
    }
};

module.exports = {validateTheToken};