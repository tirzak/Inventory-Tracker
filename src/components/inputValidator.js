import {body} from 'express-validator'
const InputValidator =(method) => {
    switch (method) {
      case 'InventoryItem': {
       return [ 
          body('productName', 'productName does not match requirements').matches(/^[\w\-\s]+$/),
          body('description', 'description is empty').matches(/^[\w\-\s]+$/),
          body('itemCount').isInt({min: 1, max: 1000}),
         ]   
      }
    }
}
export default InputValidator;