import { mockUserFindByEmail } from '@tests/routes/access/login/mock';
import User from '@database/model/User';
import Keystore from '@database/model/Keystore';
import { Types } from 'mongoose';
import bcrypt from 'bcrypt';

export const USER_NAME = 'abc';
export const USER_PROFILE_PIC = 'https://abc.com/xyz';

export const bcryptHashSpy = jest.spyOn(bcrypt, 'hash'); // func hash be watched

export const mockUserCreate = jest.fn(
	async (user: User): Promise<{ user: User; keystore: Keystore }> => {
		user._id = new Types.ObjectId();
		return {
			user: user,
			keystore: {
				_id: new Types.ObjectId(),
				client: user,
				primaryKey: 'abc',
				secondaryKey: 'xyz',
			} as Keystore,
		};
	},
);

jest.mock('@database/repository/UserRepo', () => ({
	findByEmail: mockUserFindByEmail, // already defined mock
	create: mockUserCreate,
}));
