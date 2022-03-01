import mongoose from 'mongoose';

const ProjectSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    deadline:{
        type:Date,
        required:true
    },
    progress:{
        type:Number,
        required:true
    },
    managerId:{
        type:String,
        required:true
    }
});

const ProjectModel=mongoose.model("projects",ProjectSchema);
export default ProjectModel;