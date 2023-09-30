<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { ContentDigital } from '$lib/models/contents';
	import {
		drawerStore,
		popup,
		type ModalSettings,
		type PopupSettings,
		modalStore
	} from '@skeletonlabs/skeleton';

	export let contentData: ContentDigital;

	const formObj = $page.data.formCreateContent;
	const openContentDetail = (contentId: string) => {
		drawerStore.open({
			id: 'contentDetail',
			meta: {
				contentId,
				content: contentData,
				formObj
			},
			position: 'right'
		});
	};

	const deleteModalConfirmation: ModalSettings = {
		type: 'confirm',
		title: 'Hapus Konten',
		body: `Apakah anda yakin ingin menghapus konten dengan judul: ${contentData.title}?`,
		async response(confirm) {
			if (confirm) {
				const data = new FormData();
				data.append('id', contentData.id);
				data.append('delete', 'true');
				try {
					await fetch('/admin?/contents', {
						method: 'POST',
						body: data
					});
				} catch (error) {
					console.error(error);
				}

				goto(location.pathname, { keepFocus: true, invalidateAll: true });
			}
		}
	};
	const openDeleteConfirmationModal = () => {
		modalStore.trigger(deleteModalConfirmation);
	};

	let isMenuOpen: boolean = false;
	const popupMenuSettings = {
		event: 'click',
		target: `collectionMenu${contentData.id}`,
		placement: 'bottom-end',
		middleware: {
			offset: -2
		},
		state(event) {
			isMenuOpen = event.state;
		}
	} as PopupSettings;
</script>

<div
	role="button"
	tabindex="0"
	class="flex gap-10 items-start md:items-center justify-between rounded-lg p-4 w-full border border-surface-200-700-token hover:border-surface-400-500-token cursor-pointer"
	on:click|preventDefault|stopPropagation={() => openContentDetail(contentData.id)}
	on:keydown={(event) => {
		if (event.key === 'Enter' || event.key === ' ') {
			openContentDetail(contentData.id);
		}
	}}
>
	<div class="flex flex-col w-full md:flex-row gap-x-10 gap-y-3">
		<div class="flex-1">
			<p class="h5 font-semibold">{contentData.title}</p>
			<p class="text-sm line-clamp-1">{contentData.link.targetUrl}</p>
		</div>
		<!-- <div class="flex-1">
              <p class="h5 font-semibold">Generated Link</p>
              <p class="text-sm">{collectionData.generatedLink.url}</p>
            </div> -->
	</div>
	<button
		class="btn-icon btn-sm flex-shrink-0 hover:variant-soft {isMenuOpen ? 'variant-soft' : ''}"
		on:click|stopPropagation|preventDefault={() => {}}
		use:popup={popupMenuSettings}
	>
		<i class="bx bx-dots-horizontal-rounded" />
	</button>
	<div class="card py-2 shadow-lg" data-popup="collectionMenu{contentData.id}">
		<div class="flex flex-col gap-y-1">
			<button
				class="btn btn-sm justify-start text-start rounded-none hover:text-token hover:variant-soft w-full"
			>
				<i class="bx bx-edit" />
				<span class="ml-2">Edit konten</span>
			</button>
			<button
				class="btn btn-sm justify-start text-start rounded-none hover:text-token hover:variant-soft w-full"
				on:click|stopPropagation={() => {
					// openEditModal();
				}}
			>
				<i class="bx bx-export" />
				<span class="ml-2">Download QR Code</span>
			</button>
			<button
				class="btn btn-sm justify-start text-start rounded-none hover:text-token hover:variant-soft w-full"
				on:click|preventDefault|stopPropagation={() => {
					openDeleteConfirmationModal();
				}}
			>
				<i class="bx bx-trash" />
				<span class="ml-2">Hapus konten</span>
			</button>
		</div>
	</div>
</div>
