<script>
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.postcss';
	import { LightSwitch, Toast } from '@skeletonlabs/skeleton';
</script>

<Toast position="tr" buttonDismiss="hidden" />

<div class="fixed top-2 right-2">
	<LightSwitch rounded="rounded-full" height="h-4" width="w-8" />
</div>

<slot />
