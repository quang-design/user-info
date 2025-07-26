// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: {
				// Basic info
				ip: string;
				userAgent: string;
				sessionId: string | null;
				timestamp: string;

				// Browser info
				browser: {
					name: string;
					version: string;
				};
				os: {
					name: string;
					version: string;
				};

				// Location info
				location: {
					country: string;
					region: string;
					city: string;
					latitude: number;
					longitude: number;
					timezone: string;
					isp: string;
				};

				// Request info
				referer: string;
				acceptLanguage: string;
				acceptEncoding: string;
				connection: string;

				// URL info
				url: string;
				pathname: string;
				searchParams: Record<string, string>;

				// Additional headers
				headers: {
					dnt: string | null;
					upgradeInsecureRequests: string | null;
					cacheControl: string | null;
				};
			};
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

// Layout Data interface for SEO
export interface LayoutData {
	seo: {
		title: string;
		description: string;
		keywords: string;
		author: string;
		url: string;
		siteName: string;
		type: string;
		image: string;
		imageAlt: string;
		locale: string;
		twitterCard: string;
		twitterSite?: string;
		themeColor: string;
		canonical: string;
	};
	user: App.Locals['user'];
}

export {};
