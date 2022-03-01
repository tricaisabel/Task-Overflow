import mongoose from 'mongoose';

const ItemSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    assignedTo:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    openedBy:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    progress:{
        type:Number,
        required:true
    },
    dependencies:{
        type:Array,
        required:true
    },
    projectId:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    }

});

const ItemModel=mongoose.model('items', ItemSchema);
export default ItemModel;