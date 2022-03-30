import mongoose from 'mongoose';

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    job:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    color:{
        type:String,
        required:false
    }
});

const UserModel=mongoose.model("users",UserSchema);
export default UserModel;