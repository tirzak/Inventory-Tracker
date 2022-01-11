import express from 'express';
import { db } from '../../database';

import * as ItemController from "../../controllers/itemController";
const { validationResult } = require('express-validator');
const router = express.Router()


export const InventoryRoute =  () =>{

  router.get('/',ItemController.getItemsController)

  router.get('/:sku',ItemController.getSingleItemController);

  router.post('/', ItemController.postItemsController);
  
  router.post('/:sku', ItemController.updateItemController);

  router.delete('/:sku', ItemController.deleteItemController);


  return router;

};