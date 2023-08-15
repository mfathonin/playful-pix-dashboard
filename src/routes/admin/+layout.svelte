<script lang="ts">
	import { AppShell, Avatar, LightSwitch } from '@skeletonlabs/skeleton';
	import type { LayoutData } from '../$types';

	// export let data: LayoutData;
</script>

<AppShell
	regionPage="relative"
	slotHeader="sticky top-0 z-10 border-b border-surface-200-700-token"
	slotPageContent="container mx-auto py-6"
>
	<svelte:fragment slot="header">
		<div class="h-14 container mx-auto px-4 md:px-8 flex justify-between items-center">
			<h2 class="h2">Logo</h2>
			<div class="flex gap-4 items-center">
				<div
					class="flex gap-4 items-center py-1 pl-1 pr-4 rounded-full cursor-pointer group hover:bg-surface-200-700-token"
				>
					<Avatar
						initials="A"
						fallback="A"
						width="w-8 h-8"
						border="border-2 border-surface-200-700-token group-hover:!border-primary-500"
					/>
					<p class="hidden md:flex">User email</p>
				</div>
				<!-- <form method="post" action="/auth?/logout" use:enhance>
					<button>Logout</button>
				</form> -->

				<LightSwitch rounded="rounded-full" height="h-5" width="w-10" />
			</div>
		</div>
	</svelte:fragment>
	<div class="container px-4 md:px-8 py-4">
		<slot />
	</div>
	<svelte:fragment slot="pageFooter">
		<div class="container mx-auto py-2 px-4 md:px-8 hidden md:flex justify-between items-center">
			<small class="text-surface-500-400-token">Copyright © 2023</small>
			<div class="font-medium text-sm">PlayfulPix</div>
		</div>
	</svelte:fragment>
</AppShell>
