import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
dotenv.config();
import connectDB from './db/connect.js';
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import userRoutes from './routes/user.js'
import mealRoutes from './routes/meal.js';
import bodyParser from 'body-parser';
const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
//middleware

app.use('/user', userRoutes)
app.use('/meal', mealRoutes)


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