import express from 'express';
import { signIn, signUp, getUsers } from '../controllers/user.js'
const router = express.Router();


//for debugging process to display whether users data coming or not
router.get('/', getUsers)

//for user login call
router.post('/signIn', signIn)

//for user signup call
router.post('/signUp', signUp)

export default router