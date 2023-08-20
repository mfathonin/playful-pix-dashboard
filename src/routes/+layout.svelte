<script>
	import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
	import { Drawer, Modal, Toast, drawerStore, storePopup } from '@skeletonlabs/skeleton';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import '../app.postcss';
	import ContentDetailModal from '$lib/modules/dashboard/modals/ContentDetailModal.svelte';

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
</script>

<Modal flyY={0} />
<Toast position="tr" buttonDismiss="hidden" />
<Drawer position="right">
	{#if $drawerStore.id === 'collectionDetail'}
		<ContentDetailModal />
	{/if}
</Drawer>

<div class="h-[100dvh]">
	<slot />
</div>
