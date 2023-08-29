<script>
	import { page } from '$app/stores';
	import NavigationDrawer from '$lib/modules/dashboard/layout/NavigationDrawer.svelte';
	import ContentDetailModal from '$lib/modules/dashboard/modals/ContentDetailModal.svelte';
	import CreateCollectionModal from '$lib/modules/dashboard/modals/CreateCollectionModal.svelte';
	import CreateContentModal from '$lib/modules/dashboard/modals/CreateContentModal.svelte';
	import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
	import { Drawer, Modal, Toast, drawerStore, storePopup } from '@skeletonlabs/skeleton';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import '../app.postcss';

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
	$: collectionId = $page.data.collectionId;
	$: groups = $page.data.groups;
	$: {
		if (collectionId) drawerStore.close();
	}
	let searchQuery = '';
</script>

<Modal flyY={0} />
<Toast position="tr" buttonDismiss="hidden" />
<Drawer width="w-[90dvw] md:w-full md:max-w-lg" padding="p-2 md:p-4" rounded="rounded-xl">
	{#if $drawerStore.id === 'contentDetail'}
		<ContentDetailModal />
	{:else if $drawerStore.id === 'createCollection'}
		<CreateCollectionModal />
	{:else if $drawerStore.id === 'createContent'}
		<CreateContentModal />
	{:else if $drawerStore.id === 'navigationDrawer'}
		<div class="px-4 py-6 h-full">
			<NavigationDrawer bind:value={searchQuery} {groups} {collectionId} />
		</div>
	{/if}
</Drawer>

<div class="h-[100dvh]">
	<slot />
</div>
