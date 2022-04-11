import mongoose from 'mongoose';

const ItemSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    assignedTo:{
        type:Array,
        required:true
    },
    openedBy:{
        type:String,
        required:true
    },
    progress:{
        type:Number,
        required:true
    },
    startDate:{
        type:Date,
        required:true
    },
    endDate:{
        type:Date,
        required:true
    },
    projectId:{
        type:String,
        required:true
    }
});

const ItemModel=mongoose.model('items', ItemSchema);
export default ItemModel;