import mongoose from 'mongoose';

const MessageSchema=new mongoose.Schema({
    title:{
        type:String,
        required:false
    },
    content:{
        type:String,
        required:false
    },
    sender:{
        type:String,
        required:true
    },
    time:{
        type:Date,
        required:true
    },
    parentId:{
        type:String,
        required:true
    },
    color:{
        type:String,
        required:true
    }
});

const MessageModel=mongoose.model('messages', MessageSchema);
export default MessageModel;