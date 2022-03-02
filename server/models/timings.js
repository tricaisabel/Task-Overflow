import mongoose from 'mongoose';

const TimingSchema=new mongoose.Schema({
    earlyStart:{
        type:Date,
        required:false
    },
    earlyFinish:{
        type:Date,
        required:false
    },
    lateStart:{
        type:Date,
        required:false
    },
    lateFinish:{
        type:Date,
        required:false
    },
    duration:{
        type:Number,
        required:true
    },
    critical:{
        type:Boolean,
        required:true
    },
    overtime:{
        type:Boolean,
        required:true
    },
    itemId:{
        type:String,
        required:true
    }

});

const TimingModel=mongoose.model('timings', TimingSchema);
export default TimingModel;