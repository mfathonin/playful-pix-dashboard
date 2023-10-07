<script>
	import { LightSwitch, autoModeWatcher } from '@skeletonlabs/skeleton';
</script>

<div class="fixed z-30 top-2 right-2">
	<LightSwitch
		class="bg-primary-200 border border-primary-50 dark:border-surface-700 dark:bg-surface-900"
		bgDark="bg-primary-500 dark:bg-surface-100"
		fillDark="fill-primary-500 dark:fill-primary-400-token"
		rounded="rounded-full"
		height="h-6"
		width="w-12"
	/>
</div>

<div class="w-full h-[100dvh] flex">
	<div class="w-full my-auto py-12 px-4 lg:px-8 lg:w-5/12 flex shrink-0 justify-center">
		<div class="space-y-8 w-full sm:w-4/5 md:w-96 text-center">
			<slot />
		</div>
	</div>
	<div class="w-0 hidden relative z-0 lg:flex lg:w-7/12">
		<div class="w-full bg-primary-50-900-token" />
		<div
			class="rounded-full w-[25dvw] h-[25dvw] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-400-500-token"
		/>
		<div
			class="h-1/2 absolute bottom-0 w-full bg-surface-50 dark:bg-surface-900 !bg-opacity-10 backdrop-blur-2xl"
		/>
	</div>
</div>
