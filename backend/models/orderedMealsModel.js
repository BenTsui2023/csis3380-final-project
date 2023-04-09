import mongoose from "mongoose";

const Schema = mongoose.Schema;

const orderedMealsSchema = new Schema({ 
    mealName: { type: String, required: true }, 
    quantity: { type: String, required: true },
    mealId: { type: String, required: true }
    //buyer: { type: Schema.Types.ObjectId, ref: 'user' } 
}); 

const orderedMeals = mongoose.model('orderedMeals', orderedMealsSchema);

export default orderedMeals; 
export { orderedMealsSchema }; 