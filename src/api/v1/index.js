
import express from 'express';

import { Inventory} from './inventory'
import { Group} from './group'
import { Collections } from './collections';
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
router.use('/inventory',Inventory());
router.use('/group', Group())
router.use('/collections', Collections())


return router;

}