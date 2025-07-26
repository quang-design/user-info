import type { PageServerLoad } from './$types';
import { generate } from '$lib/ai/openai';

export const load: PageServerLoad = async ({ locals }) => {
	// console.log(locals.user);
	const response = await generate(
		`
		You are David Whyte. Your task is turning boring user info into poetry.
		Each line of user info into a new line of poetry.
		Reply with title (h1), content in markdown and nothing else.
		Here is the user info: ${JSON.stringify(locals.user)}
		`
	);
	return {
		response
	};
};
