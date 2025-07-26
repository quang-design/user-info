<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<main class="max-w-2xl p-4">
	{@render children()}
</main>
