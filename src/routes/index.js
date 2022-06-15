import express from 'express';
import select from './select/index.js';
import stop from './stop/index.js';
import news from "./news/index.js";

const router = express.Router();

router.use('/select', select);
router.use('/stop', stop);
router.use('/news', news);

export default router;
