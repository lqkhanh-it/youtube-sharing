import Joi from 'joi';
import { JoiObjectId, JoiUrlEndpoint } from '@helpers/validator';

export default {
	videoUrl: Joi.object().keys({
		endpoint: JoiUrlEndpoint().required().max(200),
	}),
	videoId: Joi.object().keys({
		id: JoiObjectId().required(),
	}),
	videoCreate: Joi.object().keys({
		title: Joi.string().required().min(3).max(500),
		description: Joi.string().required().min(3).max(2000),
		videoUrl: JoiUrlEndpoint().required().max(200),
		imgUrl: Joi.string().optional().uri().max(200),
	}),
};
