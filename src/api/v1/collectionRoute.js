import express from 'express';
import { db } from '../../database';
import { v4 as uuidv4 } from 'uuid';
import  * as CollectionsController from "../../controllers/collectionController";
const router = express.Router()


export const CollectionsRoute =  () =>{

  router.get('/', CollectionsController.getCollectionsController);
  router.get('/:uuid', CollectionsController.getSingleCollectionController);

  router.post('/',CollectionsController.postCollectionsController);
  



  router.delete('/', CollectionsController.deleteCollectionController);


  return router;

};