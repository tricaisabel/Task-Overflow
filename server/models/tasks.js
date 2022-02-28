import mongoose from 'mongoose';

const TaskSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    duration:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:false
    }
});

const TaskModel=mongoose.model("tasks",TaskSchema);
export default TaskModel;