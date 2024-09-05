import express from 'express';
import ApiKeyRepo from '@database/repository/ApiKeyRepo';
import { ForbiddenError } from '@core/ApiError';
import { PublicRequest } from 'app-request';
import schema from './schema';
import validator, { ValidationSource } from '@helpers/validator';
import asyncHandler from '@helpers/asyncHandler';
import { Header } from '@core/utils';
import ApiKey, { Permission } from '@database/model/ApiKey';

const router = express.Router();

export default router.use(
	validator(schema.apiKey, ValidationSource.HEADER),
	asyncHandler(async (req: PublicRequest, res, next) => {
		const key = req.headers[Header.API_KEY]?.toString();
		if (!key) throw new ForbiddenError();

		const apiKey = await ApiKeyRepo.findByKey(key);
		if (!apiKey) throw new ForbiddenError();

		req.apiKey = apiKey;
		return next();
	}),
);

export async function createAPIKey(
	req: express.Request,
	res: express.Response,
) {
	try {
		const payload: Omit<ApiKey, '_id' | 'key'> = {
			permissions: req?.body?.permissions || [Permission.GENERAL],
			version: req?.body?.version || 1,
			comments: req?.body?.comments || '',
			status: req?.body?.status || false,
		};

		const apiKey = await ApiKeyRepo.create(payload);
		res.status(201).send(apiKey);
	} catch (error) {
		res.status(500).send(error);
	}
}
