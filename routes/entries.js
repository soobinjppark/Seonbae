const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const Entry = require('../models/Entry');

router.get('/', auth, async (req, res) => {
    try {
        const entries = await Entry.find({ user: req.user.id }).sort({date: -1});
        res.json(entries);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/entryList', auth, async (req, res) => {
    try {
        const all = await Entry.find({}).sort({date: -1});
        res.json(all);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.post('/', [auth, [
    check('name', "Name is required").not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {name, year, school, location, companies, job, description} = req.body;

    try {
        const newEntry = new Entry({ name, year, school, location, companies, job, description, user: req.user.id });
        const entry = await newEntry.save();
        res.json(entry);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

})

router.put('/:id', auth, async (req, res) => {
    const {name, year, school, location, companies, description, job} = req.body;

    const entryInfo = {};
    if (name) entryInfo.name = name;
    if (year) entryInfo.year = year;
    if (school) entryInfo.school = school;
    if (location) entryInfo.location = location;
    if (companies) entryInfo.companies = companies;
    if (description) entryInfo.description = description;
    if (job) entryInfo.job = job;

    try {
        let entry = await Entry.findById(req.params.id);
        if (!entry) {
            return res.status(404).json({msg: 'Entry not found'});
        }

        // Confirm the entry belongs to the user
        if (entry.user.toString() !== req.user.id) {
            return res.status(401).json({msg: 'User is not authorized'})
        }

        // Creates an entry if it doesn't exist
        entry = await Entry.findByIdAndUpdate(req.params.id, { $set: entryInfo}, {new: true});
        res.json(entry);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

router.delete('/:id', auth, async (req, res) => {
    try {
        let entry = await Entry.findById(req.params.id);
        if (!entry) {
            return res.status(404).json({msg: 'Entry not found'});
        }

        // Confirm the entry belongs to the user
        if (entry.user.toString() !== req.user.id) {
            return res.status(401).json({msg: 'User is not authorized'})
        }

        await Entry.findByIdAndDelete(req.params.id);
        res.json('Removed entry');

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;