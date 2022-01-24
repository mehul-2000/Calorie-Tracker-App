import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        let decodedData
        if (token) {
            decodedData = jwt.verify(token, 'test')
            req.userId = decodedData?.id
        }
        else {
            console.log('Error in processing token')
        }
        next();
    }
    catch (err) {
        res.status(401).send("Unauthorized:No token provided")
        console.log(error)
    }
}
export default auth