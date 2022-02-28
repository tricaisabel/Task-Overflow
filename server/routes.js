import express from 'express';
const router=express.Router();

import TaskModel from './models/tasks.js';

import {
    postRecord,getRecord,getRecords,updateRecord,deleteRecord
} from './service.js'

router.route('/tasks')
        .get((req,res)=>getRecords(req,res,TaskModel))
        .post((req,res)=>postRecord(req,res,TaskModel)) ;

router.route('/task/:id')
        .get((req,res)=>getRecord(req,res,TaskModel))    
        .patch((req,res)=>updateRecord(req,res,TaskModel))
        .delete((req,res)=>deleteRecord(req,res,TaskModel));

export default router;