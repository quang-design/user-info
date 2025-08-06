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

export async function stream(input: string) {
	const stream = await client.responses.create({
		model: 'gpt-4.1',
		input: [
			{
				role: 'user',
				content: input
			}
		],
		stream: true
	});

	return new ReadableStream({
		async start(controller) {
			for await (const event of stream) {
				if (event.type === 'response.output_text.delta') {
					controller.enqueue(event.delta);
				}
				if (event.type === 'response.completed') {
					controller.close();
					break;
				}
				// Add a small delay for illustration purposes
				await new Promise((resolve) => setTimeout(resolve, 50));
			}
		}
	});
}
