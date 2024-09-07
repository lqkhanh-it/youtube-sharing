import { API_KEY } from './apikey/mock';
import { Types } from 'mongoose';

export const ACCESS_TOKEN = 'xyz';
export const REFRESH_TOKEN = 'xyz';
export const USER_ID = new Types.ObjectId(); // random id with object id format

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addHeaders = (request: any) =>
	request
		.set('Content-Type', 'application/json')
		.set('x-api-key', API_KEY)
		.timeout(2000);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const addAuthHeaders = (request: any, accessToken = ACCESS_TOKEN) =>
	request
		.set('Content-Type', 'application/json')
		.set('Authorization', `Bearer ${accessToken}`)
		.set('x-api-key', API_KEY)
		.timeout(2000);
