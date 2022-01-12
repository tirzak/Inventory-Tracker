import express from 'express';
import { InputValidator } from '../../middlewares/inputValidator';
import * as ItemController from "../../controllers/itemController";
import { SKUValidator } from '../../middlewares/uuidValidator';
const router = express.Router()


export const InventoryRoute =  () =>{

  /**
 * 
 * Gets all items 
 * Returns a json object with mixed data types
 */
  router.get('/',ItemController.getItemsController)

    /**
 * 
 * Gets a single item
 * Returns a json object with mixed data types
 */
  router.get('/:sku',SKUValidator, ItemController.getSingleItemController);

/**
 * 
 * Creates a single item. Takes json object
 * Returns a json object with mixed data types
 */
  router.route('/').post(InputValidator,ItemController.postItemsController)
/**
 * 
 * Updates a single item. Takes json object as request body and sku as a request parameter
 * Returns a json object with mixed data types
 */
  router.route('/:sku',).post(SKUValidator,InputValidator, ItemController.updateItemController);
 /**
 * 
 * Deletes a single item. Takes sku as a request parameter
 * Returns a json object with string data type
 */
  router.route('/:sku').delete(SKUValidator,ItemController.deleteItemController);


  return router;

};