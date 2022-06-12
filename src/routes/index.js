import express from 'express';
import select from './select/index.js';
import stop from './stop/index.js';

const router = express.Router();

router.use('/select', select);
router.use('/stop', stop);

export default router;
