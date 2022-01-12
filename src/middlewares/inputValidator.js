const {check, validationResult} = require('express-validator');
export const InputValidator = [

          check('productName').trim().escape().not().isEmpty().withMessage('Product Name cannot be empty')
          .matches(/^[\w]+[\w\-\s]*[\w]+$/).withMessage('Product Name contains illegal characters')
          .isLength({max: 45}).withMessage('Product Name can only contain max 56 characters'),

          check('description').trim().escape().not().isEmpty().withMessage('Description cannot be empty')
          .matches(/^[\w]+[\w\-,\s]*[\w]+$/).withMessage('Description contains illegal characters')
          .isLength({max: 56}).withMessage('Description can only contain max 56 characters'),
          
          check('itemCount').isInt({min: 1, max: 1000}),
      
      (req, res, next) => {
        const errors = validationResult(req);
        
        
        if (!errors.isEmpty())
          return res.status(422).json({errors: errors.array()});
        next();
      },
    ]
  
 