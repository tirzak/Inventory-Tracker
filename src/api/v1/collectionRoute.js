import express from 'express';
import  * as CollectionsController from "../../controllers/collectionController";
import { UUIDValidator } from '../../middlewares/uuidValidator';
const router = express.Router()


export const CollectionsRoute =  () =>{

  router.route('/').get( CollectionsController.getCollectionsController);
  router.route('/:uuid').get( UUIDValidator, CollectionsController.getSingleCollectionController);

  router.route('/').post(CollectionsController.postCollectionsController);

  router.route('/').delete(CollectionsController.deleteCollectionController);


  return router;

};