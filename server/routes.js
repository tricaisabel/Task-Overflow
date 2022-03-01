import express from 'express';
const router=express.Router();

import ItemModel from './models/items.js';
import UserModel from './models/users.js';
import ProjectModel from './models/projects.js';

import {
    postRecord,getRecord,getRecords,updateRecord,deleteRecord
} from './service.js'

//Items
router.route('/items')
        .get((req,res)=>getRecords(req,res,ItemModel))
        .post((req,res)=>postRecord(req,res,ItemModel)) ;

router.route('/item/:id')
        .get((req,res)=>getRecord(req,res,ItemModel))    
        .patch((req,res)=>updateRecord(req,res,ItemModel))
        .delete((req,res)=>deleteRecord(req,res,ItemModel));

//Projects
router.route('/projects')
        .get((req,res)=>getRecords(req,res,ProjectModel))
        .post((req,res)=>postRecord(req,res,ProjectModel)) ;

router.route('/project/:id')
        .get((req,res)=>getRecord(req,res,ProjectModel))    
        .patch((req,res)=>updateRecord(req,res,ProjectModel))
        .delete((req,res)=>deleteRecord(req,res,ProjectModel));

//Users
router.route('/users')
        .get((req,res)=>getRecords(req,res,UserModel))
        .post((req,res)=>postRecord(req,res,UserModel)) ;

router.route('/user/:id')
        .get((req,res)=>getRecord(req,res,UserModel))    
        .patch((req,res)=>updateRecord(req,res,UserModel))
        .delete((req,res)=>deleteRecord(req,res,UserModel));

export default router;