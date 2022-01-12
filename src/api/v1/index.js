
import express from 'express';

import { InventoryRoute } from './inventoryRoute'
import { GroupRoute } from './groupRoute'
import { CollectionsRoute } from './collectionRoute';
const router = express.Router()


export default () =>{
router.get('/',(req, res)=>{
    res.send('Hello from index')
})    


/**
 * 
 * The code below keeps the code clean by using different files for different routes
 * 
 */

/**
 * 
 * Handles all the requests related to inventory items
 * Returns a json object with mixed data types
 */
router.use('/inventory',InventoryRoute());

/**
 * 
 * Handles all the requests related to group creation and modification
 * Returns a json object with data having string type
 */
router.use('/group', GroupRoute())


/**
 * 
 * Handles all the requests related to retrieving group item relation
 * Returns a json object with mixed data types
 */
router.use('/collections', CollectionsRoute())


return router;

}