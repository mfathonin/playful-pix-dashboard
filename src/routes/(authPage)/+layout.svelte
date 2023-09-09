<script>
	import { LightSwitch } from '@skeletonlabs/skeleton';
</script>

<div class="fixed top-2 right-2">
	<LightSwitch rounded="rounded-full" height="h-4" width="w-8" />
</div>

<div class="w-full h-[100dvh] flex">
	<div class="w-0 hidden sm:flex sm:w-7/12 md:w-6/12">
		<div class="w-full bg-surface-300 m-10">Image</div>
	</div>
	<div class="w-full my-auto py-12 px-4 lg:px-8 sm:w-5/12 md:w-6/12 flex shrink-0 justify-center">
		<div class="space-y-8 w-full sm:w-4/5 md:w-96 text-center">
			<slot />
		</div>
	</div>
</div>
