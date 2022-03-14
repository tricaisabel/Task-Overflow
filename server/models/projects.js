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
    password:{
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
    manager:{
        name:{
            type:String,
            required:true
        },
        picture:{
            type:String,
            required:true
        }
    },
    team:{
        type:Array,
        required:false
    }
});

const ProjectModel=mongoose.model("projects",ProjectSchema);
export default ProjectModel;