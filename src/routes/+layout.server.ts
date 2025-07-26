import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ url, locals }) => {
	const siteUrl = url.origin;
	const currentPath = url.pathname;

	// Base SEO data
	const seo = {
		title: 'User Agent Poetry Generator',
		description:
			'Transform your digital footprint into beautiful AI-generated poetry. A unique visitor information collection system that turns browser data into art.',
		keywords:
			'poetry, AI, user agent, digital art, browser data, creative technology, generative art',
		author: 'User Agent Poetry Generator',
		url: `${siteUrl}${currentPath}`,
		siteName: 'User Agent Poetry Generator',
		type: 'website',
		image: `${siteUrl}/opengraph/opengraph.png`,
		imageAlt: 'User Agent Poetry Generator - Transform your digital footprint into poetry',
		locale: 'en_US',
		twitterCard: 'summary_large_image',
		twitterSite: '@useragentpoetry', // Update with actual handle if available
		themeColor: '#1f2937', // Dark gray theme
		canonical: `${siteUrl}${currentPath}`
	};

	// Dynamic title based on whether user data exists
	if (locals.user) {
		seo.title = 'Your Digital Poetry | User Agent Poetry Generator';
		seo.description =
			'Your unique digital fingerprint has been transformed into beautiful AI-generated poetry. Discover the art hidden in your browser data.';
	}

	return {
		seo,
		user: locals.user
	};
};
