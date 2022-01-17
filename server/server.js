import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
import connectDB from './db/connect.js';
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import auth from './routes/auth.js'
const app = express();
app.use(express.json())
//middleware
app.use(auth)
app.get("/", (req, res) => {
    res.send('Welcome!')
})
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)
const port = process.env.PORT || 5000


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, (req, res) => {
            console.log(`Server listening on ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()