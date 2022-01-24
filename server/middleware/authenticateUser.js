import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const authenticateUser = async (req, res, next) => {
    try {
        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token, 'test')
        const rootUser = await User.findOne({ _id: verifyToken._id, "tokens.token": token })
        if (!rootUser) {
            throw new Error('User not found')
        }
        req.userId = rootUser._id;
        next();

    }
    catch (err) {
        res.status(401).send('Unauthorized: No token provided')
        console.log(err)
    }
}

export default authenticateUser