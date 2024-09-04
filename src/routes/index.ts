import express from 'express';
import signup from '@/routes/access/signup';

const router = express.Router();

router.use('/signup', signup);

export default router;
