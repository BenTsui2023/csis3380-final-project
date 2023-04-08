import mongoose from "mongoose";

const Schema = mongoose.Schema;

const orderedMealsSchema = new Schema({ 
    type: { type: String, required: true }, 
    name: { type: String, required: true }, 
    owner: { type: Schema.Types.ObjectId, ref: 'user' } 
}); 

const orderedMeals = mongoose.model('orderedMeals', orderedMealsSchema);

export default orderedMeals; 
export { orderedMealsSchema }; 