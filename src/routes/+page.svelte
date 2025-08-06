<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { marked } from 'marked';

	let { data }: { data: PageData } = $props();

	let poetry = $state('');
	let markedPoetry = $derived(marked(poetry, { gfm: true, breaks: true }));

	onMount(() => {
		getPoetry();
	});

	async function getPoetry() {
		try {
			const res = await fetch('/api', {
				method: 'POST'
			});

			if (!res.body) throw new Error('No response body');

			const reader = res.body.getReader();
			const decoder = new TextDecoder();

			while (true) {
				const { done, value } = await reader.read();
				if (done) break;

				const chunk = decoder.decode(value);
				setTimeout(() => {
					poetry += chunk;
				}, 500);
			}
		} catch (error) {
			console.error('Error:', error);
		}
	}
</script>

<svelte:head>
	<title>{data.seo.title}</title>
	<meta name="description" content={data.seo.description} />
	<meta name="keywords" content={data.seo.keywords} />
	<meta name="author" content={data.seo.author} />
	<meta name="robots" content="index, follow" />
	<meta name="language" content="English" />
	<meta name="theme-color" content={data.seo.themeColor} />
	<link rel="canonical" href={data.seo.canonical} />
</svelte:head>

{#await markedPoetry}
	Loading poetry...
{:then markedPoetry}
	<pre class="w-full wrap-break-word whitespace-pre-wrap">
		{@html markedPoetry}
	</pre>
{:catch error}
	Error: {error.message}
{/await}

<style>
</style>
