<script lang="ts">
	import GroupToolbar from './GroupToolbar.svelte';
	import NotFoundGroupsData from '../NotFoundGroupsData.svelte';
	import NoGroupsData from '../NoGroupsData.svelte';
	import GroupCard from '../GroupCard.svelte';
	import type { Collection } from '$lib/models/collections';

	export let collections: Collection[];
	export let collectionId: string;
	export let value: string;

	$: filteredCollections = collections.filter((collection) =>
		collection.name.toLowerCase().includes(value.toLowerCase())
	);
</script>

<div class="flex flex-col h-full overflow-y-auto">
	<GroupToolbar bind:value />
	{#if filteredCollections.length === 0}
		{#if value}
			<NotFoundGroupsData />
		{:else}
			<NoGroupsData />
		{/if}
	{:else}
		{#key filteredCollections.length}
			<div class="p-4 bg-surface-50-900-token space-y-1 rounded-lg h-full overflow-auto">
				{#each filteredCollections as group}
					<GroupCard {group} isSelected={group.id === collectionId} />
				{/each}
			</div>
		{/key}
	{/if}
</div>
