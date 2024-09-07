import ApiKey, { ApiKeyModel, Permission } from '@database/model/ApiKey';
import crypto from 'crypto';

async function findByKey(key: string): Promise<ApiKey | null> {
	return ApiKeyModel.findOne({ key: key, status: true }).lean().exec();
}

async function create(keyInfo: Partial<ApiKey>): Promise<ApiKey> {
	const now = new Date();
	const keystore = await ApiKeyModel.create({
		version: keyInfo?.version,
		permissions: keyInfo?.permissions ?? [Permission.GENERAL],
		comments: keyInfo?.comments ?? '',
		key: crypto.randomBytes(64).toString('hex'),
		status: keyInfo?.status ?? false,
		createdAt: now,
		updatedAt: now,
	});
	console.log(keystore);

	if (keystore?.errors) {
		throw new Error(keystore.errors?.message);
	}
	return keystore.toObject();
}

export default {
	findByKey,
	create,
};
