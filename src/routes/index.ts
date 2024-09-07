import express from 'express';
import apikey, { createAPIKey } from '@auth/apikey';
import permission from '@helpers/permission';
import { Permission } from '@database/model/ApiKey';

import signup from '@routes/access/signup';
import login from '@routes/access/login';
import logout from '@routes/access/logout';
import token from '@routes/access/token';
import authentication from '@auth/authentication';

const router = express.Router();

router.post('/apikey/create', createAPIKey);
router.use(apikey);

//@ts-ignore
router.use(permission(Permission.GENERAL) as any);
router.use('/signup', signup);
router.use('/login', login);
router.use('/token', token);
router.use('/logout', logout);

router.use(authentication);
router.post('/health/check', (req, res) => res.send({ ok: true }));

export default router;
