import express from 'express';
import signup from '@routes/access/signup';
import apikey, { createAPIKey } from '@auth/apikey';

const router = express.Router();

router.post('/apikey/create', createAPIKey);

router.use(apikey);

router.use('/signup', signup);

export default router;
