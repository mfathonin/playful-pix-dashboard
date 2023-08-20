<script lang="ts">
	import GroupToolbar from './GroupToolbar.svelte';
	import NotFoundGroupsData from '../NotFoundGroupsData.svelte';
	import NoGroupsData from '../NoGroupsData.svelte';
	import GroupCard from '../GroupCard.svelte';
	import type { Group } from '$lib/models/groups';

	export let groups: Group[];
	export let collectionId: string;
	export let value: string;

	$: filteredGroups = groups.filter((group) =>
		group.title.toLowerCase().includes(value.toLowerCase())
	);
</script>

<div class="flex flex-col h-full overflow-y-auto">
	<GroupToolbar bind:value />
	{#if filteredGroups.length === 0}
		{#if value}
			<NotFoundGroupsData />
		{:else}
			<NoGroupsData />
		{/if}
	{:else}
		{#key filteredGroups.length}
			<div class="p-4 bg-surface-50-900-token space-y-1 rounded-lg h-full overflow-auto">
				{#each filteredGroups as group}
					<GroupCard {group} isSelected={group.id === collectionId} />
				{/each}
			</div>
		{/key}
	{/if}
</div>
