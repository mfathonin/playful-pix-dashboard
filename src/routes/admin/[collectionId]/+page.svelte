<script lang="ts">
	import GroupDetailHeader from '$lib/modules/dashboard/GroupDetailHeader.svelte';
	import { drawerStore } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';

	export let data: PageData;
	$: activeGroup = data.group;
	$: collections = data.collections;

	const formObj = data.form;
	const openCollectionDetail = (collectionId: string) => {
		drawerStore.open({
			id: 'collectionDetail',
			meta: {
				collectionId,
				collection: collections.find((collection) => collection.id === collectionId),
				formObj
			},
			width: 'w-[280px] md:w-[480px]',
			padding: 'p-4',
			rounded: 'rounded-xl'
		});
	};
</script>

<GroupDetailHeader group={activeGroup} />
{#if collections}
	<div class="space-y-3 mt-8">
		{#each collections as collectionData, i}
			<div
				role="button"
				tabindex="0"
				class="flex gap-10 items-center justify-between rounded-lg p-4 w-full border border-surface-200-700-token cursor-pointer"
				on:click|preventDefault|stopPropagation={() => openCollectionDetail(collectionData.id)}
				on:keydown={(event) => {
					if (event.key === 'Enter' || event.key === ' ') {
						openCollectionDetail(collectionData.id);
					}
				}}
			>
				<div class="flex-1">
					<p class="h5 font-semibold">{collectionData.title}</p>
					<p class="text-sm">{collectionData.generatedLink.targetUrl}</p>
				</div>
				<!-- <div class="flex-1">
						<p class="h5 font-semibold">Generated Link</p>
						<p class="text-sm">{collectionData.generatedLink.url}</p>
					</div> -->
				<div class="flex-1">
					<p class="h5 font-semibold">Statistik</p>
					<p class="text-sm">
						Dilihat {collectionData.visitors} (Dibuka: {collectionData.views})
					</p>
				</div>
				<button class="btn-icon btn-sm hover:variant-soft flex-shrink-0">
					<i class="bx bx-dots-horizontal-rounded" />
				</button>
			</div>
		{/each}
	</div>
{/if}
