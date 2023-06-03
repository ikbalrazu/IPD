const jwt = require('jsonwebtoken');


async function authentication(req, res, next){
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
  
        //decodes token id
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("token: ",token);
        console.log(decoded);
        next();
      } catch (error) {
        res.status(400).json({ message: "Invalid Token !" });
      }
    }
  
    if (!token) {
        res.status(400).json({ message: "Not authorized!" });
    }
}

module.exports = authentication