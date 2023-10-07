<script lang="ts">
	import { page } from '$app/stores';
	import SearchBar from '$lib/compoenents/SearchBar.svelte';
	import { drawerStore } from '@skeletonlabs/skeleton';

	export let value: string;

	const openCreateCollectionModal = () => {
		drawerStore.open({
			id: 'createCollection',
			meta: {
				formObj: $page.data.formCreateCollection
			},
			position: 'right'
		});
	};

	const openFilterModal = () => {
		console.log('openFilterModal');
	};
</script>

<h3 class="h3 mb-2">Daftar Koleksi</h3>
<p class="text-sm text-secondary-700-200-token opacity-70 mb-3">
	Kelola konten digital untuk koleksi anda dengan mudah
</p>
<div class="flex gap-2 mb-6">
	<SearchBar bind:value />
	<button
		class="btn-icon h-8 w-8 lg:h-10 lg:w-10 flex-shrink-0 variant-soft-primary"
		on:click|preventDefault|stopPropagation={openFilterModal}
	>
		<i class="bx bx-filter-alt text-sm lg:text-xl text-primary-500-400-token" />
	</button>
	<button
		class="btn-icon h-8 lg:h-10 w-8 lg:w-10 flex-shrink-0 variant-filled-primary"
		on:click|stopPropagation|preventDefault={openCreateCollectionModal}
	>
		<i class="bx bx-plus text-sm lg:text-xl" />
	</button>
</div>
