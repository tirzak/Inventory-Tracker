import express from 'express';
import { db } from '../../database';
import { v4 as uuidv4 } from 'uuid';
import * as GroupController from "../../controllers/groupController";
const router = express.Router()

import { UUIDValidator } from '../../middlewares/uuidValidator';
import { GroupValidator } from '../../middlewares/groupValidator';
export const GroupRoute =  () =>{

  router.get('/', GroupController.getGroupsController);
  router.route('/:uuid').get(UUIDValidator, GroupController.getSingleGroupController);

  router.route('/').post(GroupValidator, GroupController.postGroupsController);
  
  router.route('/:uuid').post(UUIDValidator,GroupValidator, GroupController.updateGroupController);

  router.route('/:uuid').delete(UUIDValidator, GroupController.deleteGroupController);


  return router;

};