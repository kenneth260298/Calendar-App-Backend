const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');
const Event = require('../models/Event');

const getEvents = async (req, res = response) => {

    const events = await Event.find().populate('user', 'name');

    res.status(200).json({
        ok: true,
        events
    })

}

const createEvent = async (req, res = response) => {

    let event = new Event(req.body);

    try {
        event.user = req.uid;
        const savedEvent = await event.save();

        res.status(201).json({
            ok: true,
            msg: 'Event created',
            event: savedEvent
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator'
        })
    }
}

const updateEvent = async (req, res = response) => {

    const eventId = req.params.id;
    const uid = req.uid;
    try {

        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'The event doesnt exists'
            })
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'Unauthorized'
            })
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, { new: true });

        res.json({
            ok: true,
            event: updatedEvent
        })

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator'
        })
    }
}

const deleteEvent = async (req, res = response) => {


    const eventId = req.params.id;
    const uid = req.uid;
    try {

        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'The event doesnt exists'
            })
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'Unauthorized'
            })
        }

        await Event.findByIdAndDelete(eventId);

        res.json({
            ok: true
        })

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator'
        })
    }

}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}