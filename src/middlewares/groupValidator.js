const {check, validationResult} = require('express-validator');
export const GroupValidator = [
   
      
        check('groupName').trim().escape().not().isEmpty().withMessage('Group Name cannot be empty')
          .matches(/^[\w]+[\w\-\s]*[\w]+$/).withMessage('Group Name contains illegal characters'),
      (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
          return res.status(422).json({errors: errors.array()});
        next();
      },
    ]

    