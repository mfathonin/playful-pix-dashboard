<script lang="ts">
	import { page } from '$app/stores';
	import NoDataImg from '$lib/assets/svg/NoDocuments.svg?raw';
	import { drawerStore } from '@skeletonlabs/skeleton';

	const openCreateCollectionModal = () => {
		drawerStore.open({
			id: 'createCollection',
			meta: {
				formObj: $page.data.formCreateCollection
			},
			position: 'right'
		});
	};
</script>

<div
	class="rounded-lg p-4 bg-surface-50-900-token flex-1 flex flex-col items-center justify-center my-auto gap-6"
>
	{@html NoDataImg}
	<div class="space-2 text-center max-w-[249px]">
		<p class="font-medium">Belum terdapat buku</p>
		<p class="text-sm text-secondary-700-200-token">
			Tambahkan buku untuk agar dapat mengelola konten digital
		</p>
	</div>
	<button
		class="btn variant-filled-primary cursor-pointer text-sm"
		on:click={openCreateCollectionModal}
	>
		<i class="bx bx-plus mr-2" />Tambah buku
	</button>
</div>
