import express from 'express';
import { db } from '../../database';
import { v4 as uuidv4 } from 'uuid';
import * as GroupController from "../../controllers/groupController";
const router = express.Router()

import { UUIDValidator } from '../../middlewares/uuidValidator';
import { GroupValidator } from '../../middlewares/groupValidator';
export const GroupRoute =  () =>{
/**
 * 
 * Gets all groups
 * Returns a json object with string data type
 */
  router.get('/', GroupController.getGroupsController);
/**
 * 
 * Gets a single group. Takes uuid of a  group object as a parameter
 * Returns a json object with string data type
 */
  router.route('/:uuid').get(UUIDValidator, GroupController.getSingleGroupController);

  /**
 * 
 * Creates a single group object. Takes json object in the body
 * Returns a json object with string data type
 */
  router.route('/').post(GroupValidator, GroupController.postGroupsController);
  
    /**
 * 
 * Updates a single group object. Takes json object in the body and uuid of a group
 * object as a request parameter
 * Returns a json object with string data type
 */
  router.route('/:uuid').post(UUIDValidator,GroupValidator, GroupController.updateGroupController);

  /**
 * 
 * Deletes a single group. Takes uuid of a  group object as a parameter
 * Returns a json object with string data type
 */
  router.route('/:uuid').delete(UUIDValidator, GroupController.deleteGroupController);


  return router;

};