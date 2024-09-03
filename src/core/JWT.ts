import path from 'path';
import { readFile } from 'fs';
import { promisify } from 'util';
import { sign, verify } from 'jsonwebtoken';
import { InternalError, BadTokenError, TokenExpiredError } from './ApiError';

export class JwtPayload {
	aud: string;
	sub: string;
	iss: string;
	iat: number;
	exp: number;
	prm: string;

	constructor(
		issuer: string,
		audience: string,
		subject: string,
		param: string,
		validity: number,
	) {
		this.iss = issuer;
		this.aud = audience;
		this.sub = subject;
		this.iat = Math.floor(Date.now() / 1000);
		this.exp = this.iat + validity;
		this.prm = param;
	}
}

async function readPublicKey(): Promise<string> {
	return promisify(readFile)(
		path.join(__dirname, '../../keys/public.pem'),
		'utf8',
	);
}

async function readPrivateKey(): Promise<string> {
	return promisify(readFile)(
		path.join(__dirname, '../../keys/private.pem'),
		'utf8',
	);
}

async function encode(payload: JwtPayload): Promise<string> {
	const cert = await readPrivateKey();
	if (!cert) throw new InternalError('Token generation failure');
	return sign({ ...payload }, cert, { algorithm: 'RS256' });
}

async function validate(token: string): Promise<JwtPayload> {
	const cert = await readPublicKey();
	try {
		const validation = verify(token, cert) as JwtPayload;
		return validation;
	} catch (e: any) {
		if (e && e?.name === 'TokenExpiredError') throw new TokenExpiredError();
		throw new BadTokenError();
	}
}

async function decode(token: string): Promise<JwtPayload> {
	const cert = await readPublicKey();
	try {
		const decoded = verify(token, cert, {
			algorithms: ['RS256'],
			ignoreExpiration: true,
		}) as JwtPayload;

		return decoded;
	} catch {
		throw new BadTokenError();
	}
}

export default {
	encode,
	validate,
	decode,
};
