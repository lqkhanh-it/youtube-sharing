export enum MessageType {
	NOTIFICATION = 'NOTIFICATION',
	VIDEO_UPDATE = 'VIDEO_UPDATE',
	RESPONSE = 'RESPONSE',
}

export const formatWssMessage = (message: string, type: MessageType) =>
	`${type}::${message}` as string;

export const parseWssMessage = (message: string) => {
	const [type, data] = message.split('::');
	return { type, data };
};
