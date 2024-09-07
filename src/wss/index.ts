import { wsAuthenticate } from '@auth/authentication';
import Logger from '@core/Logger';
import WebSocket, { WebSocketServer } from 'ws';
import VideoRepo from '@database/repository/VideoRepo';
import { parseUrl } from '@helpers/videoParsing';
import { formatWssMessage, MessageType } from '@helpers/wssMessage';

const wss = new WebSocketServer({
	port: 8080,
});

wss.on('listening', () => {
	Logger.info('Websocket server started');
});

wss.on('connection', async (ws, request) => {
	wsAuthenticate(request, {}, () => {});

	VideoRepo.findLatestVideos(1, 10).then((videos) => {
		ws.send(formatWssMessage(JSON.stringify(videos), MessageType.VIDEO_UPDATE));
	});
	ws.on('message', async (data) => {
		// @ts-ignore
		if (!request?.user) {
			ws.send(formatWssMessage('Unauthorized', MessageType.RESPONSE));
			return;
		}
		const url = data.toString();
		const [title, description, thumbnail] = await parseUrl(url);

		const vid = await VideoRepo.create({
			title,
			description,
			imgUrl: thumbnail,
			// @ts-ignore
			author: request.user?._id,
			videoUrl: url,
			status: true,
		});

		if (!vid) {
			ws.send(
				formatWssMessage('Video could not be shared!', MessageType.RESPONSE),
			);
		} else {
			ws.send(formatWssMessage('Video shared', MessageType.RESPONSE));
		}

		wss.clients.forEach((client) => {
			if (client?.readyState === WebSocket.OPEN) {
				if (client !== ws) {
					client.send(
						formatWssMessage(JSON.stringify(vid), MessageType.NOTIFICATION),
					);
				}
				client.send(
					formatWssMessage(JSON.stringify([vid]), MessageType.VIDEO_UPDATE),
				);
			}
		});
	});

	ws.on('error', (err) => {
		Logger.error(err?.message);
		ws.terminate();
	});
});

wss.on('error', (err) => {
	console.log(err?.message);
	Logger.error(err?.message);
});

wss.on('close', () => {
	wss.clients.forEach((client) => {
		if (client.readyState === WebSocket.OPEN) {
			client.terminate();
		}
	});
});
