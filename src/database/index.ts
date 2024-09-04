import mongoose from 'mongoose';
import Logger from '@core/Logger';
import { db } from './../config';

// Build the connection string
const dbURI = `mongodb://${db.user}:${encodeURIComponent(db.password)}@${db.host}:${db.port}`;

const options = {
	autoIndex: true,
	minPoolSize: db.minPoolSize,
	maxPoolSize: db.maxPoolSize,
	connectTimeoutMS: 60000, // 10 seconds
	socketTimeoutMS: 45000, // 45 seconds
};

Logger.debug(dbURI);

function setRunValidators() {
	// @ts-ignore
	this.setOptions({ runValidators: true });
}

mongoose.set('strictQuery', true);

// Create the database connection
mongoose
	.plugin((schema: mongoose.Schema) => {
		schema.pre('findOneAndUpdate', setRunValidators);
		schema.pre('updateOne', setRunValidators);
	})
	.connect(dbURI, options)
	.then(() => {
		Logger.info('Mongoose connection done');
	})
	.catch((e) => {
		Logger.info('Mongoose connection error');
		Logger.error(e);
	});

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', () => {
	Logger.debug('Mongoose default connection open to ' + dbURI);
});

// If the connection throws an error
mongoose.connection.on('error', (err) => {
	Logger.error('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
	Logger.info('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
	mongoose.connection.close().finally(() => {
		Logger.info(
			'Mongoose default connection disconnected through app termination',
		);
		process.exit(0);
	});
});

export const connection = mongoose.connection;
