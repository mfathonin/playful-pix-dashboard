<script lang="ts">
	import SearchBar from '$lib/compoenents/SearchBar.svelte';
	import ContentCard from '$lib/modules/dashboard/ContentCard.svelte';
	import NoContent from '$lib/modules/dashboard/emptyState/NoContent.svelte';
	import NotFoundContent from '$lib/modules/dashboard/emptyState/NotFoundContent.svelte';
	import GroupDetailHeader from '$lib/modules/dashboard/GroupDetailHeader.svelte';
	import { drawerStore } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';

	export let data: PageData;
	$: activeGroup = data.group;
	$: collections = data.collections;

	let serachQuery = '';
	$: filteredCollections = collections.filter((collection) => {
		if (serachQuery === '') return true;
		return collection.title.toLowerCase().includes(serachQuery.toLowerCase());
	});

	const openCreateContentModal = () => {
		drawerStore.open({
			id: 'createContent',
			meta: {
				collectionId: activeGroup.id
			},
			position: 'right'
		});
	};
</script>

<GroupDetailHeader group={activeGroup} />
{#if collections && collections.length > 0}
	<div class="flex justify-between items-center gap-5 mt-5">
		<SearchBar bind:value={serachQuery} />
		<div class="flex gap-2">
			<button class="btn btn-sm w-9 h-9 lg:w-11 lg:h-11 xl:w-fit variant-soft-secondary">
				<i class="bx bx-cloud-download text-lg lg:text-xl" />
				<span class="hidden xl:block text-base">Unduh Semua QR</span>
			</button>
			<button
				class="btn btn-sm w-9 h-9 lg:w-11 lg:h-11 xl:w-fit variant-filled-primary"
				on:click|preventDefault|stopPropagation={openCreateContentModal}
			>
				<i class="bx bx-plus text-lg lg:text-xl" />
				<span class="hidden xl:block text-base">Tambah konten</span>
			</button>
		</div>
	</div>
{/if}
<hr class="!border-surface-200-700-token mt-5" />
{#if collections && collections.length > 0}
	{#key filteredCollections.length}
		{#if filteredCollections.length === 0}
			<div class="flex-grow flex items-center justify-center">
				<NotFoundContent />
			</div>
		{:else}
			<div class="space-y-3 mt-8">
				{#each filteredCollections as collectionData}
					<ContentCard {collectionData} />
				{/each}
			</div>
		{/if}
	{/key}
{/if}
{#if collections.length === 0}
	<div class="flex-grow flex items-center justify-center">
		<NoContent />
	</div>
{/if}
