import type { Handle } from '@sveltejs/kit';
import { dev } from '$app/environment';

async function getLocationFromIP(ip: string) {
	// In production, you'd use a service like ipapi.co, ipinfo.io, or similar
	// For development, return mock data
	if (dev || ip === '127.0.0.1' || ip === '::1') {
		return {
			country: 'Unknown',
			region: 'Unknown',
			city: 'Unknown',
			latitude: 0,
			longitude: 0,
			timezone: 'Unknown',
			isp: 'Unknown'
		};
	}

	try {
		// Example using ipapi.co (free tier available)
		// You'll need to handle rate limits and errors appropriately
		const response = await fetch(`http://ipapi.co/${ip}/json/`);
		const data = await response.json();

		return {
			country: data.country_name || 'Unknown',
			region: data.region || 'Unknown',
			city: data.city || 'Unknown',
			latitude: data.latitude || 0,
			longitude: data.longitude || 0,
			timezone: data.timezone || 'Unknown',
			isp: data.org || 'Unknown'
		};
	} catch (error) {
		console.error('Failed to get location data:', error);
		return {
			country: 'Unknown',
			region: 'Unknown',
			city: 'Unknown',
			latitude: 0,
			longitude: 0,
			timezone: 'Unknown',
			isp: 'Unknown'
		};
	}
}

function parseUserAgent(userAgent: string) {
	// Basic user agent parsing - in production consider using a library like 'ua-parser-js'
	const browser = {
		name: 'Unknown',
		version: 'Unknown'
	};

	const os = {
		name: 'Unknown',
		version: 'Unknown'
	};

	// Simple browser detection
	if (userAgent.includes('Chrome')) {
		browser.name = 'Chrome';
		const match = userAgent.match(/Chrome\/([0-9.]+)/);
		browser.version = match ? match[1] : 'Unknown';
	} else if (userAgent.includes('Firefox')) {
		browser.name = 'Firefox';
		const match = userAgent.match(/Firefox\/([0-9.]+)/);
		browser.version = match ? match[1] : 'Unknown';
	} else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
		browser.name = 'Safari';
		const match = userAgent.match(/Version\/([0-9.]+)/);
		browser.version = match ? match[1] : 'Unknown';
	}

	// Simple OS detection
	if (userAgent.includes('Windows')) {
		os.name = 'Windows';
		if (userAgent.includes('Windows NT 10.0')) os.version = '10/11';
		else if (userAgent.includes('Windows NT 6.3')) os.version = '8.1';
		else if (userAgent.includes('Windows NT 6.1')) os.version = '7';
	} else if (userAgent.includes('Mac OS X')) {
		os.name = 'macOS';
		const match = userAgent.match(/Mac OS X ([0-9_]+)/);
		os.version = match ? match[1].replace(/_/g, '.') : 'Unknown';
	} else if (userAgent.includes('Linux')) {
		os.name = 'Linux';
	} else if (userAgent.includes('Android')) {
		os.name = 'Android';
		const match = userAgent.match(/Android ([0-9.]+)/);
		os.version = match ? match[1] : 'Unknown';
	} else if (userAgent.includes('iPhone') || userAgent.includes('iPad')) {
		os.name = 'iOS';
		const match = userAgent.match(/OS ([0-9_]+)/);
		os.version = match ? match[1].replace(/_/g, '.') : 'Unknown';
	}

	return { browser, os };
}

async function getUserInformation(event: any) {
	const userAgent = event.request.headers.get('user-agent') || '';
	const ip = event.getClientAddress();
	const referer = event.request.headers.get('referer') || '';
	const acceptLanguage = event.request.headers.get('accept-language') || '';
	const acceptEncoding = event.request.headers.get('accept-encoding') || '';
	const connection = event.request.headers.get('connection') || '';

	// Parse user agent for browser and OS info
	const { browser, os } = parseUserAgent(userAgent);

	// Get location data (this will be async)
	const location = await getLocationFromIP(ip);

	// Generate or get session ID
	const sessionId = event.cookies.get('sessionid') || crypto.randomUUID();

	// Set session cookie if it doesn't exist
	if (!event.cookies.get('sessionid')) {
		event.cookies.set('sessionid', sessionId, {
			path: '/',
			maxAge: 60 * 60 * 24 * 30, // 30 days
			httpOnly: true,
			secure: !dev,
			sameSite: 'strict'
		});
	}

	return {
		// Basic info
		ip,
		userAgent,
		sessionId,
		timestamp: new Date().toISOString(),

		// Browser info
		browser,
		os,

		// Location info
		location,

		// Request info
		referer,
		acceptLanguage,
		acceptEncoding,
		connection,

		// URL info
		url: event.url.href,
		pathname: event.url.pathname,
		searchParams: Object.fromEntries(event.url.searchParams),

		// Additional headers that might be useful
		headers: {
			dnt: event.request.headers.get('dnt'), // Do Not Track
			upgradeInsecureRequests: event.request.headers.get('upgrade-insecure-requests'),
			cacheControl: event.request.headers.get('cache-control')
		}
	};
}

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.user = await getUserInformation(event);
	const response = await resolve(event);
	return response;
};
