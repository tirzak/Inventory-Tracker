const {check, validationResult} = require('express-validator');
export const GroupValidator = [
   
      
        check('groupName').trim().escape().not().isEmpty().withMessage('Group Name cannot be empty')
          .matches(/^[\w]+[\w\-\s]*[\w]+$/).withMessage('Group Name contains illegal characters')
          .isLength({max: 45}).withMessage('Product Name can only contain max 56 characters'),
      (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
          return res.status(422).json({errors: errors.array()});
        next();
      },
    ]

    