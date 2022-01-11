
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
router.use('/inventory',InventoryRoute());
router.use('/group', GroupRoute())
router.use('/collections', CollectionsRoute())


return router;

}