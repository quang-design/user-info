<script lang="ts">
	import type { PageData } from './$types';
	import { marked } from 'marked';
	import { textRendering } from '$lib/attachments/text-streaming';
	let { data }: { data: PageData } = $props();

	let response = $derived(marked.parse(data.response));

	// $inspect(response);
</script>

<pre
	class="w-full wrap-break-word whitespace-pre-wrap"
	{@attach textRendering}>{@html response}</pre>

<style>
</style>
