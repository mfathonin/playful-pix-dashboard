<script>
	import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
	import { Modal, Toast, storePopup } from '@skeletonlabs/skeleton';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import '../app.postcss';

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
</script>

<Modal flyY={0} />
<Toast position="tr" buttonDismiss="hidden" />

<div class="h-[100dvh]">
	<slot />
</div>
