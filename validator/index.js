exports.createPostValidator = (req, res, next ) => {
    //title
    
    req.check('title', "write a title").notEmpty()
    req.check('title', "Title musst between 4 and 150 characters").isLength({
        min: 4,
        max: 150
    });
    //body
    req.check('body', "write a title").notEmpty()
    req.check('body', "Title musst between 4 and 2000 characters").isLength({
        min: 4,
        max: 2000
    });
    
    //check for erros
    const errors = req.validationErrors();
    //if error show the fist one as they happen
    if(errors){
        const firstError = errors.map(error => error.msg)[0]
        return res.status(400).json({error: firstError});
    }

    //procced to the next middleware
    next();
};

exports.userSingupValidator = (req, res, next) => {
    //name is not null and between 4-10 characters
    req.check("name", "Name is required").notEmpty();
    //email is not null, valid and normalized
    req.check("email", "email must be 3 to 32 characters")
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @")
    .isLength({
        min:4,
        max:2000
    });   
    // check for passwords
    req.check("password", "password is required").notEmpty();
    req.check("password")
    .isLength({min: 6})
    .withMessage("password must contain at least 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain number")
    //check for errors    
     const errors = req.validationErrors();
     //if error show the fist one as they happen
     if(errors){
         const firstError = errors.map(error => error.msg)[0]
         return res.status(400).json({error: firstError});
     } 
     //procced to the next middleware
     next();
};

exports.passwordResetValidator = (req, res, next) => {
    // check for password
    req.check("newPassword", "Password is required").notEmpty();
    req.check("newPassword")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 chars long")
        .matches(/\d/)
        .withMessage("must contain a number")
        .withMessage("Password must contain a number");

    // check for errors
    const errors = req.validationErrors();
    // if error show the first one as they happen
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    // proceed to next middleware or ...
    next();
};

