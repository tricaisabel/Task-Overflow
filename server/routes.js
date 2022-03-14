import express from 'express';
const router=express.Router();

import ItemModel from './models/items.js';
import TimingModel from './models/timings.js';
import UserModel from './models/users.js';
import ProjectModel from './models/projects.js';
import MessageModel from './models/messages.js';

import {
    postRecord,getRecord,getRecords,updateRecord,deleteRecord, existRecord,getUserProjects
} from './service.js'

//Items
router.route('/items')
        .get((req,res)=>getRecords(req,res,ItemModel))
        .post((req,res)=>postRecord(req,res,ItemModel));

router.route('/item/:id')
        .get((req,res)=>getRecord(req,res,ItemModel))    
        .patch((req,res)=>updateRecord(req,res,ItemModel))
        .delete((req,res)=>deleteRecord(req,res,ItemModel));

//Item's Timing
router.route('/timings')
        .get((req,res)=>getRecords(req,res,TimingModel))
        .post((req,res)=>postRecord(req,res,TimingModel)) ;

router.route('/timing/:id')
        .get((req,res)=>getRecord(req,res,TimingModel))    
        .patch((req,res)=>updateRecord(req,res,TimingModel))
        .delete((req,res)=>deleteRecord(req,res,TimingModel));

//Projects
router.route('/projects')
        .get((req,res)=>getRecords(req,res,ProjectModel))
        .post((req,res)=>postRecord(req,res,ProjectModel));

router.route('/project/:id')
        .get((req,res)=>getRecord(req,res,ProjectModel))    
        .patch((req,res)=>updateRecord(req,res,ProjectModel))
        .delete((req,res)=>deleteRecord(req,res,ProjectModel));

router.route('/existProject')
        .post((req,res)=>existRecord(req,res,ProjectModel)); 
router.route("/userProjects/:username")
        .get((req,res)=>getUserProjects(req,res,ProjectModel));

//Users
router.route('/users')
        .get((req,res)=>getRecords(req,res,UserModel))
        .post((req,res)=>postRecord(req,res,UserModel));

router.route('/user/:id')
        .get((req,res)=>getRecord(req,res,UserModel))    
        .patch((req,res)=>updateRecord(req,res,UserModel))
        .delete((req,res)=>deleteRecord(req,res,UserModel));

router.route('/existUser')
        .post((req,res)=>existRecord(req,res,UserModel));

//Messages
router.route('/messages')
        .get((req,res)=>getRecords(req,res,MessageModel))
        .post((req,res)=>postRecord(req,res,MessageModel)) ;

router.route('/message/:id')
        .get((req,res)=>getRecord(req,res,MessageModel))    
        .patch((req,res)=>updateRecord(req,res,MessageModel))
        .delete((req,res)=>deleteRecord(req,res,MessageModel));

export default router;