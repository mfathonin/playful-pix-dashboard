<script lang="ts">
	import { page } from '$app/stores';
</script>

<div
	class="flex flex-col gap-4 items-center h-full w-full bg-surface-100-800-token p-8 px-3 md:px-8"
>
	{#if $page.status === 200}
		<p>Loading...</p>
	{/if}
	<!-- {#each data.contents as content}
		<button
			class="flex gap-1 flex-col py-3 px-6 rounded-xl max-w-[calc(100dvw - 32px)] md:max-w-md w-full border border-surface-400-500-token hover:variant-ghost-primary"
			on:click={() => window.open(content.link.targetUrl, '_blank')}
		>
			<div class="text-md font-bold">{content.collection?.name}</div>
			<div class="text-sm">{content.title}</div>
		</button>
	{/each} -->
</div>
