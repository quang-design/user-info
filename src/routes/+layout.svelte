<script lang="ts">
	import '../app.css';
	import type { LayoutData } from '../app.d.ts';
	import type { LayoutProps } from './$types';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';

	let { children, data }: LayoutProps & { data: LayoutData } = $props();

	injectAnalytics();
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{data.seo.title}</title>
	<meta name="title" content={data.seo.title} />
	<meta name="description" content={data.seo.description} />
	<meta name="keywords" content={data.seo.keywords} />
	<meta name="author" content={data.seo.author} />
	<meta name="robots" content="index, follow" />
	<meta name="language" content="English" />
	<meta name="theme-color" content={data.seo.themeColor} />
	<link rel="canonical" href={data.seo.canonical} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content={data.seo.type} />
	<meta property="og:url" content={data.seo.url} />
	<meta property="og:title" content={data.seo.title} />
	<meta property="og:description" content={data.seo.description} />
	<meta property="og:image" content={data.seo.image} />
	<meta property="og:image:alt" content={data.seo.imageAlt} />
	<meta property="og:site_name" content={data.seo.siteName} />
	<meta property="og:locale" content={data.seo.locale} />

	<!-- Twitter -->
	<meta property="twitter:card" content={data.seo.twitterCard} />
	<meta property="twitter:url" content={data.seo.url} />
	<meta property="twitter:title" content={data.seo.title} />
	<meta property="twitter:description" content={data.seo.description} />
	<meta property="twitter:image" content={data.seo.image} />
	<meta property="twitter:image:alt" content={data.seo.imageAlt} />
	{#if data.seo.twitterSite}
		<meta property="twitter:site" content={data.seo.twitterSite} />
	{/if}

	<!-- Additional SEO -->
	<meta name="application-name" content={data.seo.siteName} />
	<meta name="apple-mobile-web-app-title" content={data.seo.siteName} />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
	<meta name="format-detection" content="telephone=no" />

	<!-- Structured Data -->
	<script type="application/ld+json">
		{JSON.stringify({
			"@context": "https://schema.org",
			"@type": "WebApplication",
			"name": data.seo.siteName,
			"description": data.seo.description,
			"url": data.seo.url,
			"applicationCategory": "CreativeWork",
			"operatingSystem": "All",
			"offers": {
				"@type": "Offer",
				"price": "0",
				"priceCurrency": "USD"
			},
			"creator": {
				"@type": "Organization",
				"name": data.seo.author
			}
		})}
	</script>
</svelte:head>

<main class="max-w-lg p-4">
	{@render children()}
</main>
