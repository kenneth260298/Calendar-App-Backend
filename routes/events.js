/*
    User Routes / Events
    host + /api/events
*/
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');
const { validateFields } = require('../middlewares/field-validator');
const { validateJWT } = require('../middlewares/jwt-validator');

router.use(validateJWT);

router.get('/', getEvents);

router.post(
    '/',
    [
        check('title', 'Title is required').not().isEmpty(),
        check('start', 'Start Date is required').custom(isDate),
        check('end', 'End Date is required').custom(isDate),
        validateFields
    ],
    createEvent
);

router.put('/:id',
    [
        check('title', 'Title is required').not().isEmpty(),
        check('start', 'Start Date is required').custom(isDate),
        check('end', 'End Date is required').custom(isDate),
        validateFields
    ], updateEvent);

router.delete('/:id', deleteEvent);

module.exports = router;