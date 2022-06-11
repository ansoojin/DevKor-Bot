import express from 'express';

const router = express.Router();

router.use('/select', require('./select'));
router.use('/stop', require('./stop'));

module.exports = router;
