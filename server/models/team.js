import mongoose from 'mongoose';

const TeamSchema=new mongoose.Schema({
    projectId:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    }
});

const TeamModel=mongoose.model('teams', TeamSchema);
export default TeamModel;