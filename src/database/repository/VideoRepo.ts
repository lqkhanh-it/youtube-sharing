import Video, { VideoModel } from '@database/model/Video';
import { Types } from 'mongoose';
import User from '@database/model/User';

const AUTHOR_DETAIL = 'name profilePicUrl email';

async function create(video): Promise<Video> {
	const now = new Date();
	video.createdAt = now;
	video.updatedAt = now;
	const created = await VideoModel.create(video);
	return created.toObject();
}

async function update(video: Video): Promise<Video | null> {
	video.updatedAt = new Date();
	return VideoModel.findByIdAndUpdate(video._id, video, { new: true })
		.lean()
		.exec();
}

async function findInfoById(id: Types.ObjectId): Promise<Video | null> {
	return VideoModel.findOne({ _id: id, status: true })
		.populate('author', AUTHOR_DETAIL)
		.lean()
		.exec();
}

async function findUrlIfExists(url: string): Promise<Video | null> {
	return VideoModel.findOne({ videoUrl: url }).lean().exec();
}

async function findAllForAuthor(user: User): Promise<Video[]> {
	return VideoModel.find({ author: user, status: true })
		.populate('author', AUTHOR_DETAIL)
		.sort({ updatedAt: -1 })
		.lean()
		.exec();
}

async function findLatestVideos(
	pageNumber: number,
	limit: number,
): Promise<Video[]> {
	return VideoModel.find({ status: true })
		.skip(limit * (pageNumber - 1))
		.limit(limit)
		.populate('author', AUTHOR_DETAIL)
		.sort({ createdAt: -1 })
		.lean()
		.exec();
}

async function search(query: string, limit: number): Promise<Video[]> {
	return VideoModel.find(
		{
			$text: { $search: query, $caseSensitive: false },
			status: true,
		},
		{
			similarity: { $meta: 'textScore' },
		},
	)
		.select('-status -description')
		.limit(limit)
		.sort({ similarity: { $meta: 'textScore' } })
		.lean()
		.exec();
}

export default {
	create,
	update,
	findInfoById,
	findUrlIfExists,
	search,
	findAllForAuthor,
	findLatestVideos,
};
