import express from 'express';
import connectDB from '../db/connect.js'
import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello from Router auth.js')
})

// router.post('/register', (req, res) => {
//     const { name, email, password } = req.body;
//     if (!name || !email || !password) {
//         return res.status(422).json({ error: 'Please fill all the details...' })
//     }
//     User.findOne({ email: email })
//         .then((userExists) => {
//             if (userExists)
//                 return res.status(422).json({ error: 'Email already exists' })
//             const user = new User({ name: name, email: email, password: password })
//             user.save().then(() => {
//                 res.status(201).json({ message: 'Success! You have successfully saved the user details.' })
//             }).catch(err => {
//                 res.status(500).json({ error: 'Failed to save the user details.' })
//             })
//         }).catch(err => {
//             console.log(err)
//         })
// });

//async-await version
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(422).json({ error: 'Please fill all the details...' })
    }
    try {
        const userExists = await User.findOne({ email: email })

        if (userExists)
            return res.status(422).json({ error: 'Email already exists' })

        const user = new User({ name: name, email: email, password: password })

        const userRegister = await user.save();

        res.status(201).json({ message: 'Success! You have successfully saved the user details.' })

    }
    catch (err) {
        console.log(err)
    }

});


router.post('/login', async (req, res) => {

    try {
        let token;
        const { email, password } = req.body;

        if (!email || !password)
            res.status(401).json({ message: 'Invalid email or password!' })


        const userLogin = await User.findOne({ email: email }).select('+password')
        token = await userLogin.generateAuthToken();
        // console.log(token)
        //making cookie
        res.cookie("jwtoken", token, {
            expires: new Date(Date.now() + 25892000000),
            httpOnly: true
        })
        if (userLogin) {
            await bcrypt.compare(password, userLogin.password, function (err, isMatch) {
                if (err) {
                    res.status(401).json({ msg: "Invalid credentials" })

                }
                if (isMatch)
                    return res.status(200).json({ msg: "Login success" })
            })

        }
        else {
            res.status(401).json({ message: 'Invalid credentials.' })
        }
    } catch (err) {
        console.log(err)
    }
})
export default router