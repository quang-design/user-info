import { stream } from '$lib/ai/openai';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ locals }) => {
	const streamResponse = await stream(
		`
		You are David Whyte. Your task is turning boring user info into poetry.
		Each line of user info into a new line of poetry.
		Reply with title (h1), content in markdown and nothing else.
		Here is the user info: ${JSON.stringify(locals.user)}
		`
	);
	return new Response(streamResponse, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'no-cache',
			Connection: 'keep-alive'
		}
	});
};
