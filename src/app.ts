import 'module-alias/register';
import express, { Request, Response, Application, NextFunction } from 'express';
import dotenv from 'dotenv';
import 'dotenv/config';

import Logger from '@core/Logger';
import cors from 'cors';
import { corsUrl, environment } from './config';
import './database'; // initialize database
import {
	NotFoundError,
	ApiError,
	InternalError,
	ErrorType,
} from './core/ApiError';
import routes from './routes';

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

process.on('uncaughtException', (e) => {
	Logger.error(e);
});

app.use(express.json({ limit: '10mb' }));
app.use(
	express.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }),
);
app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }));

// Routes
app.use('/api/v1', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => next(new NotFoundError()));

// Middleware Error Handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	if (err instanceof ApiError) {
		ApiError.handle(err, res);
		if (err.type === ErrorType.INTERNAL)
			Logger.error(
				`500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
			);
	} else {
		Logger.error(
			`500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
		);
		Logger.error(err);
		if (environment === 'development') {
			return res.status(500).send(err);
		}
		ApiError.handle(new InternalError(), res);
	}
});

app.listen(port, () => {
	console.log(`Server is Fire at http://localhost:${port}`);
});

export default app;
