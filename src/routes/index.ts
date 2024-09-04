import express from 'express';
import signup from '@routes/access/signup';
import apikey from '@auth/apikey';

const router = express.Router();
router.use(apikey);

router.use('/signup', signup);

export default router;
