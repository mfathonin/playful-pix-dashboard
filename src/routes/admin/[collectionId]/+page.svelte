<script lang="ts">
	import SearchBar from '$lib/compoenents/SearchBar.svelte';
	import CollectionDetailHeader from '$lib/modules/dashboard/CollectionDetailHeader.svelte';
	import ContentCard from '$lib/modules/dashboard/ContentCard.svelte';
	import NoContent from '$lib/modules/dashboard/emptyState/NoContent.svelte';
	import NotFoundContent from '$lib/modules/dashboard/emptyState/NotFoundContent.svelte';
	import { CANVAS_QR_PREFIX_ID } from '$lib/utils/constants';
	import { downloadQRCodes } from '$lib/utils/helpers.client';
	import { drawerStore } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';

	export let data: PageData;
	$: activeCollection = data.collection;
	$: contents = data.contents;

	let serachQuery = '';
	$: filteredContents =
		contents?.filter((content) => {
			if (serachQuery === '') return true;
			return content.title.toLowerCase().includes(serachQuery.toLowerCase());
		}) || [];

	const openCreateContentModal = () => {
		drawerStore.open({
			id: 'createContent',
			meta: {
				formObj: data.formCreateContent,
				collectionId: activeCollection.id
			},
			position: 'right'
		});
	};
	const handleDownloadAllQR = () => {
		const canvases: NodeListOf<HTMLCanvasElement> = document.querySelectorAll<HTMLCanvasElement>(
			'.' + CANVAS_QR_PREFIX_ID.concat(activeCollection.id)
		);
		const QRData = Array.from(canvases).map((canvas) => ({
			canvas,
			name: canvas.getAttribute('data-name')!
		}));
		downloadQRCodes(QRData, activeCollection.name);
	};
</script>

<CollectionDetailHeader collection={activeCollection} />
{#if contents && contents.length > 0}
	<div class="flex justify-between items-center gap-5 mt-5">
		<SearchBar bind:value={serachQuery} />
		<div class="flex gap-2">
			<button
				class="btn btn-sm w-9 h-9 lg:w-11 lg:h-11 xl:w-fit variant-soft-primary text-primary-500-400-token"
				on:click={handleDownloadAllQR}
			>
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
{#if contents && contents.length > 0}
	{#key filteredContents.length}
		{#if filteredContents.length === 0}
			<div class="flex-grow flex items-center justify-center">
				<NotFoundContent />
			</div>
		{:else}
			<div class="space-y-3 mt-8">
				{#each filteredContents as contentData}
					<ContentCard {contentData} />
				{/each}
			</div>
		{/if}
	{/key}
{/if}
{#if contents?.length === 0}
	<div class="flex-grow flex items-center justify-center">
		<NoContent />
	</div>
{/if}
