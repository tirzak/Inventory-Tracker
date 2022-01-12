import express from 'express';
import  * as CollectionsController from "../../controllers/collectionController";
import { UUIDValidator } from '../../middlewares/uuidValidator';
const router = express.Router()


export const CollectionsRoute =  () =>{
/**
 * 
 * Gets all group-item relation (collections). 
 * Returns a json object with mixed data types
 */
  router.route('/').get( CollectionsController.getCollectionsController);

  /**
 * 
 * Gets a single group to many items relation (collections). Takes a group object's uuid as request
 * parameter
 * Returns a json object with mixed data types
 */
  router.route('/:uuid').get( UUIDValidator, CollectionsController.getSingleCollectionController);
 /**
 * 
 * Creates a single group to item relation . Takes a json object as request body
 * Returns a json object with mixed data types
 */
  router.route('/').post(CollectionsController.postCollectionsController);
 /**
 * 
 * Deletes a single group to item relation . Takes a json object as request body
 * Returns a json object with mixed data types
 */
  router.route('/').delete(CollectionsController.deleteCollectionController);


  return router;

};