
const {check, validationResult} = require('express-validator');
export const SKUValidator = [
   
      
          check('sku').trim().escape()
          .matches(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i).withMessage("Invalid UUID"),
      
      (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
          return res.status(422).json({errors: errors.array()});
        next();
      },
]
  
export const UUIDValidator = [
   
      
    check('uuid').trim().escape()
    .matches(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i).withMessage("Invalid UUID"),

(req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({errors: errors.array()});
  next();
},
]