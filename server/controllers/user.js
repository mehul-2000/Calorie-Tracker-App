import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'
// import { generateAuthToken } from '../models/User.js'

export const getUsers = async (req, res) => {
    try {

        const postUsers = await User.find()
        //to display whether meals are coming from database or not
        // console.log(postMeals)
        res.status(200).json(postUsers)
    }
    catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const signIn = async (req, res) => {
    const { email, password } = req.body

    try {

        const existingUser = await User.findOne({ email })

        if (!existingUser) return res.status(404).json({ message: 'User doesn\'t exists' })
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
        if (!isPasswordCorrect) return res.status(404).json({ message: 'Invalid Password', status: 404 })
        const token = await existingUser.generateAuthToken();
        res.cookie("jwtoken", token, {
            expires: new Date(Date.now() + 25892000000),
            httpOnly: true
        });
        res.status(200).json({ result: existingUser, token });
    } catch (err) {
        res.status(500).json({ message: 'Something wrong in signin Controller' })
    }
}

export const signUp = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) return res.status(404).json({ message: 'User already exists' })
        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ name, email, password: hashedPassword })
        const token = await result.generateAuthToken()

        res.status(200).json({ result, token })
    } catch (err) {
        res.status(500).json({ message: 'Something wrong in signUp Controller' })
    }


}