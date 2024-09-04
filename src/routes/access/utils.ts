import User from '@/database/model/User';
import pick from 'lodash/pick';

export const enum AccessMode {
	LOGIN = 'LOGIN',
	SIGNUP = 'SIGNUP',
}

export async function getUserData(user: User) {
	const data = pick(user, ['_id', 'name', 'roles', 'profilePicUrl']);
	return data;
}
