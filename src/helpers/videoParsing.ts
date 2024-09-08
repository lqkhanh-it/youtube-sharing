import fetch from 'node-fetch';

// parse the video description and title from youtube url
export const parseUrl = async (url: string) => {
	try {
		if (!url.includes('youtube.com')) throw new Error('Not a youtube url');

		// fetch the page contents
		const body = await fetch(url).then((res) => res.text());
		console.log(body);

		return parseDataFromHTML(body);
	} catch (error) {
		console.error(error);
		throw new Error('Unable to parse the video title and description');
	}
};

export const parseDataFromHTML = (body: string) => {
	const matchTitle = body.match(/<title>([^<]*)<\/title>/); // regular expression to parse contents of the <title> tag
	const matchDesc = body.match(/<meta name="description" content="([^"]*)"/); // regular expression to parse contents of the <meta> tag
	const thumbnail =
		body.match(/<meta property="og:image" content="([^"]*)"/) ?? [];

	console.log('@@', matchTitle, matchDesc, thumbnail);

	if (!matchTitle || !matchDesc)
		throw new Error('Unable to parse the video title and description');
	return [matchTitle[1], matchDesc[1], thumbnail[1]];
};
