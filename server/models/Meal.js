import mongoose from 'mongoose';

const MealSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
    },
    calories: {
        type: Number,
        required: [true, 'Please provide calories'],
    },
    date: {
        type: Date,
        default: new Date(),
    },
    createdBy: {
        type: String,
    }
})


const Meal = mongoose.model('Meals', MealSchema)

export default Meal