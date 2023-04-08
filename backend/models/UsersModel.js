import mongoose from "mongoose";
import bcrypt from 'bcrypt';

// define Schema Class
const Schema = mongoose.Schema;

function updatePassword(user, next) { 
    bcrypt.genSalt(10, function (err, salt) { 
        if (err) return next(err); 
        bcrypt.hash(user.password, salt, function (err, hash) { 
            if (err) return next(err); 
            user.password = hash; 
            next(); 
        }); 
    });
} 

const userSchema = new Schema({ 
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    orderedMeals: [{ type: Schema.Types.ObjectId, ref: 'orderedMeals' }] 
});

userSchema.pre('save', function (next) { 
    updatePassword(this, next); 
});

userSchema.methods.comparePassword = function (password, next) { 
    bcrypt.compare(password, this.password, function (err, isMatch) { 
        if (err) return next(err); 
        return next(null, isMatch); 
    }); 
}; 
 
const User = mongoose.model('user', userSchema); 

export default User;