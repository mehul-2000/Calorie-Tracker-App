import mongoose from 'mongoose';
// import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        minlength: 3,
        maxlength: 20,
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        // validate: {
        //     // validator: validator.isEmail,
        //     message: 'Please provide a valid email',
        // },
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
    },
    id: { type: String },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            }
        }
    ]

})



// userSchema.pre('save', async function (next) {
//     if (this.isModified('password')) {
//         this.password = await bcrypt.hash(this.password, 12);
//     }
//     next();
// })

// Generating AuthToken
userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ email: this.email, _id: this._id }, 'test', { expiresIn: "1h" });
        this.tokens = this.tokens.concat({ token: token })
        await this.save();
        return token;
    }
    catch (err) {
        console.log(err);
    }
}

const User = mongoose.model('USER', userSchema)

export default User;