import express from 'express';
import { db } from '../../database';
import { v4 as uuidv4 } from 'uuid';
import * as GroupController from "../../controllers/groupController";
const router = express.Router()


export const GroupRoute =  () =>{

  router.get('/', GroupController.getGroupsController);
  router.get('/:uuid', GroupController.getSingleGroupController);

  router.post('/', GroupController.postGroupsController);
  
  router.post('/:uuid', GroupController.updateGroupController);

  router.delete('/:uuid', GroupController.deleteGroupController);


  return router;

};