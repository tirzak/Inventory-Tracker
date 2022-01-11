import express from 'express';
import { InputValidator } from '../../middlewares/inputValidator';
import * as ItemController from "../../controllers/itemController";
import { SKUValidator } from '../../middlewares/uuidValidator';
const router = express.Router()


export const InventoryRoute =  () =>{

  router.get('/',ItemController.getItemsController)

  router.get('/:sku',SKUValidator, ItemController.getSingleItemController);

  router.route('/').post(InputValidator,ItemController.postItemsController)

  router.route('/:sku',).post(SKUValidator,InputValidator, ItemController.updateItemController);

  router.route('/:sku').delete(SKUValidator,ItemController.deleteItemController);


  return router;

};