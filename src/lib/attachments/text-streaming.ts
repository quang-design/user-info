import type { Attachment } from 'svelte/attachments';
import { animate, stagger, text } from 'animejs';

export const textRendering: Attachment = (element) => {
	const { chars } = text.split(element as HTMLElement, {
		chars: { wrap: true }
	});

	const animation = animate(chars, {
		y: ['75%', '0%'],
		duration: 25,
		ease: 'out(3)',
		delay: stagger(25)
	});

	return () => {
		if (animation) {
			animation.pause();
		}
	};
};
