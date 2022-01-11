const {check, validationResult} = require('express-validator');
export const InputValidator = [

          check('productName').trim().escape().not().isEmpty().withMessage('Product Name cannot be empty')
          .matches(/^[\w]+[\w\-\s]*[\w]+$/).withMessage('Product Name contains illegal characters'),
          check('description').trim().escape().not().isEmpty().withMessage('Description cannot be empty')
          .matches(/^[\w]+^[\w\-,.\s]*[\w]+$/).withMessage('Description contains illegal characters'),
          check('itemCount').isInt({min: 1, max: 1000}),
      
      (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
          return res.status(422).json({errors: errors.array()});
        next();
      },
    ]
  
 