/*
    User Routes / Auth
    host + /api/auth
*/
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { createUser, userLogin, reValidateToken } = require('../controllers/auth');
const { validateFields } = require('../middlewares/field-validator');
const { validateJWT } = require('../middlewares/jwt-validator');

router.post(
    '/new',
    [
        //middleware
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('password', 'Password is required').isLength({ min: 6 }),
        validateFields
    ],
    createUser
);

router.post(
    '/',
    [
        //middleware
        check('email', 'Email is required').isEmail(),
        check('password', 'Password is required').isLength({ min: 6 }),
        validateFields
    ],
    userLogin
);

router.get(
    '/renew',
    validateJWT,
    reValidateToken
);


module.exports = router;