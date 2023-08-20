<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Group } from '$lib/models/groups';
	import {
		modalStore,
		popup,
		type ModalSettings,
		type PopupSettings
	} from '@skeletonlabs/skeleton';

	export let group: Group;
	const { id, title: groupTitle } = group;
	export let isSelected: boolean = false;
	let isOpen: boolean = false;

	const navigateToDetail = () => {
		if (id === undefined) return;
		if (isSelected) return goto(`/admin`, { keepFocus: true, invalidateAll: true });
		goto(`/admin/${id}`, { keepFocus: true, invalidateAll: true });
	};

	const popupMenuSettings: PopupSettings = {
		event: 'click',
		target: 'popupMenu' + group.id,
		placement: 'bottom-end',
		middleware: {
			offset: -2
		},
		state(event) {
			isOpen = event.state;
		}
	};

	const modalDeleteConfirmation = {
		type: 'confirm',
		title: 'Hapus Buku',
		body: `Apakah anda yakin ingin menghapus buku dengan judul: ${groupTitle}?`,
		response(confirm) {
			if (confirm) {
				console.log('delete', group);
				// deleteGroup();
			}
		}
	} as ModalSettings;

	const openDeleteConfirmationModal = () => {
		modalStore.trigger(modalDeleteConfirmation as ModalSettings);
	};
</script>

<div
	role="button"
	tabindex="0"
	class="flex w-full text-start py-1 px-4 pr-1 h-11 gap-x-1 group border border-transparent hover:border-primary-400-500-token hover:bg-primary-300-600-token rounded-lg items-center cursor-pointer select-none {isSelected
		? 'bg-primary-200-700-token'
		: ''}"
	on:click={navigateToDetail}
	on:keydown={(event) => {
		if (event.key === 'Enter' || event.key === ' ') {
			navigateToDetail();
		}
	}}
>
	<span class="flex-1 text-ellipsis line-clamp-1">{groupTitle}</span>
	<button
		class="btn-icon btn-sm h-8 w-8 {isOpen
			? 'flex variant-soft'
			: 'hidden'} group-hover:flex hover:variant-soft"
		use:popup={popupMenuSettings}
		on:click|preventDefault|stopPropagation={() => {}}
	>
		<i class="bx bx-dots-horizontal-rounded" />
	</button>
</div>

<div class="card py-2 shadow-md" data-popup="popupMenu{group.id}">
	<div class="flex flex-col gap-y-1">
		<button
			class="btn btn-sm justify-start text-start rounded-none hover:text-token hover:variant-soft w-full"
			on:click={() => {
				// openEditModal();
			}}
		>
			<i class="bx bx-edit" />
			<span class="ml-2">Edit Buku</span>
		</button>
		<button
			class="btn btn-sm justify-start text-start rounded-none hover:text-token hover:variant-soft w-full"
			on:click|preventDefault|stopPropagation={() => {
				openDeleteConfirmationModal();
			}}
		>
			<i class="bx bx-trash" />
			<span class="ml-2">Hapus Buku</span>
		</button>
	</div>
</div>
