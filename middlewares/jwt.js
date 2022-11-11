const jwt = require('jsonwebtoken')
require('dotenv').config()
const SECRET_KEY = process.env.SECRET_KEY;

const generateToken = payload => {
    const token = jwt.sign({data: payload}, SECRET_KEY, {expiresIn: '24h'});
    return token
};

const decodeToken = token => {
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
          return 'Token inválido'
        } else {
            const user = decoded.data;
            return user
        }
    })
}

module.export = {
    generateToken, 
    decodeToken
}