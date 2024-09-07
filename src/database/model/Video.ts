import { Schema, model, Types } from 'mongoose';
import User from './User';

export const DOCUMENT_NAME = 'Video';
export const COLLECTION_NAME = 'videos';

export default interface Video {
	_id: Types.ObjectId;
	title: string;
	description: string;
	author: Omit<User, '_id'>;
	imgUrl?: string;
	status?: boolean;
	videoUrl: string;
	createdAt?: Date;
	updatedAt?: Date;
}

const schema = new Schema<Video>(
	{
		title: {
			type: Schema.Types.String,
			required: true,
			maxlength: 500,
			trim: true,
		},
		description: {
			type: Schema.Types.String,
			required: true,
			maxlength: 2000,
			trim: true,
		},

		author: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
			index: true,
		},
		imgUrl: {
			type: Schema.Types.String,
			required: false,
			maxlength: 500,
			trim: true,
		},
		videoUrl: {
			type: Schema.Types.String,
			required: true,
			unique: true,
			maxlength: 200,
			trim: true,
		},
		status: {
			type: Schema.Types.Boolean,
			default: true,
			select: false,
		},
		createdAt: {
			type: Date,
			required: true,
		},
		updatedAt: {
			type: Date,
			required: true,
			select: false,
		},
	},
	{
		versionKey: false,
	},
);

schema.index(
	{ title: 'text', description: 'text' },
	{ weights: { title: 3, description: 1 }, background: false },
);
schema.index({ _id: 1, status: 1 });
schema.index({ videoUrl: 1 });
schema.index({ author: 1, status: 1 });

export const VideoModel = model<Video>(DOCUMENT_NAME, schema, COLLECTION_NAME);
