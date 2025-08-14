<script lang="ts">
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { marked } from 'marked';

	let { data }: { data: PageData } = $props();

	let poetry = $state('');
	let markedPoetry = $derived(marked(poetry, { gfm: true, breaks: true }));
	let loadPromise: Promise<void> | null = $state(null);

	onMount(() => {
		loadPromise = getPoetry();
	});

	async function getPoetry(): Promise<void> {
		const res = await fetch('/api', {
			method: 'POST'
		});

		if (!res.ok) {
			throw new Error(`Request failed: ${res.status} ${res.statusText}`);
		}

		if (!res.body) {
			throw new Error('No response body');
		}

		const reader = res.body.getReader();
		const decoder = new TextDecoder();

		while (true) {
			const { done, value } = await reader.read();
			if (done) break;

			const chunk = decoder.decode(value);
			poetry += chunk;
		}
	}

	$inspect('poetry', poetry);
	// $inspect('markedPoetry', markedPoetry);
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

{#if loadPromise}
	{#await loadPromise}
		{#if !markedPoetry}
			<p>Loading poetry...</p>
		{/if}
		<pre class="w-full wrap-break-word whitespace-pre-wrap">
			{@html markedPoetry}
		</pre>
	{:then}
		<pre class="w-full wrap-break-word whitespace-pre-wrap">
			{@html markedPoetry}
		</pre>
	{:catch error}
		<p class="text-red-600">Error: {error.message}</p>
	{/await}
{/if}

<style>
</style>
