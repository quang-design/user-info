import OpenAI from 'openai';
import { OPENAI_API_KEY } from '$env/static/private';

const client = new OpenAI({
	apiKey: OPENAI_API_KEY
});

export async function generate(input: string) {
	const response = await client.responses.create({
		model: 'gpt-4.1',
		input
	});
	return response.output_text;
}
