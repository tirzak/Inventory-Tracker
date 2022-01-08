
import { Inventory} from './inventory'
//import { AdminRoute} from './admin'
import express from 'express';
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
//router.use('/schedules', SchedulesRoute())

return router;

}