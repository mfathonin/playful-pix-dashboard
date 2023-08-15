<script>
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.postcss';
	import { LightSwitch, Toast } from '@skeletonlabs/skeleton';
</script>

<Toast position="tr" buttonDismiss="hidden" />

<div class="h-[100dvh]">
	<slot />
</div>
