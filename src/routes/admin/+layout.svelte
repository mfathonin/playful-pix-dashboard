<script lang="ts">
	import AppHearder from '$lib/modules/dashboard/layout/AppHearder.svelte';
	import NavigationDrawer from '$lib/modules/dashboard/layout/NavigationDrawer.svelte';
	import PageHeader from '$lib/modules/dashboard/layout/PageHeader.svelte';
	import { AppShell } from '@skeletonlabs/skeleton';
	import type { LayoutData } from './$types';
	export let data: LayoutData;

	let searchQuery = '';
	$: collectionId = data.collectionId ?? '';
	$: groups =
		data.collections?.filter((group) =>
			group.name.toLowerCase().includes(searchQuery.toLowerCase())
		) || [];
</script>

<AppShell
	regionPage="relative"
	slotHeader="sticky top-0 z-10 border-b border-surface-200-700-token"
	slotPageContent="container mx-auto py-6"
>
	<svelte:fragment slot="header">
		<AppHearder />
	</svelte:fragment>
	<div class="container px-3 md:px-6 py-4">
		<PageHeader />

		<div class="flex gap-8 mt-[52px]">
			<div
				class="hidden min-h-[65dvh] max-h-[calc(100dvh_-_168px)] sticky top-4 lg:flex lg:5/12 xl:4/12 pt-6 pb-5 px-4 bg-surface-100-800-token rounded-lg flex-col"
			>
				<NavigationDrawer bind:value={searchQuery} {groups} {collectionId} />
			</div>
			<div
				class="w-full lg:min-h-[calc(100dvh_-_168px)] flex flex-col flex-shrink-0 lg:w-7/12 xl:w-8/12 py-5 px-4 border rounded-lg border-surface-200-700-token"
			>
				<slot />
			</div>
		</div>
	</div>
	<svelte:fragment slot="pageFooter">
		<div class="hidden md:flex container mx-auto py-2 px-4 md:px-8 justify-between items-center">
			<small class="text-surface-500-400-token">Copyright © 2023</small>
			<div class="font-medium text-sm">PlayfulPix</div>
		</div>
	</svelte:fragment>
</AppShell>
