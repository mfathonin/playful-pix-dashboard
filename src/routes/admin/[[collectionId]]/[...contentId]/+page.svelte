<script lang="ts">
	import GroupCard from '$lib/modules/dashboard/GroupCard.svelte';
	import GroupDetailHeader from '$lib/modules/dashboard/GroupDetailHeader.svelte';
	import NoGroupsData from '$lib/modules/dashboard/NoGroupsData.svelte';
	import NoSelectedGroup from '$lib/modules/dashboard/NoSelectedGroup.svelte';
	import NotFoundGroupsData from '$lib/modules/dashboard/NotFoundGroupsData.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let searchQuery = '';
	let groups = data.groups;
	$: activeGroup = data.activeGroup;
	$: groups = data.groups.filter((group) =>
		group.title.toLowerCase().includes(searchQuery.toLowerCase())
	);
</script>

<div class="flex flex-col gap-3">
	<h2 class="h2">Content Digital Management</h2>
	<p class="text-secondary-700-200-token">Memudahkan Anda dalam mengelola konten digital</p>
</div>

<div class="flex gap-8 mt-[52px]">
	<div
		class="hidden min-h-[65dvh] max-h-[calc(100dvh_-_168px)] sticky top-4 lg:flex lg:4/12 xl:3/12 pt-6 pb-5 px-4 bg-surface-100-800-token rounded-lg flex-col"
	>
		<h3 class="h3 mb-2">Daftar Buku</h3>
		<p class="text-sm text-secondary-700-200-token mb-3">
			Kelola Content digital untuk buku anda dengan mudah
		</p>
		<div class="flex gap-2 mb-6">
			<div class="input-group h-8 lg:h-10 lg:input-group-divider grid-cols-[auto_1fr_auto]">
				<div class="!hidden lg:!flex lg:input-group-shim"><i class="bx bx-search" /></div>
				<input
					class="outline-none py-1 lg:py-2 px-2 lg:px-3"
					type="text"
					placeholder="Cari"
					name="q"
					id="q"
					bind:value={searchQuery}
				/>
			</div>
			<div class="btn-icon h-8 w-8 lg:h-10 lg:w-10 flex-shrink-0 variant-filled-surface">
				<i class="bx bx-filter-alt text-sm lg:text-xl text-on-surface-token" />
			</div>
			<div class="btn-icon h-8 lg:h-10 w-8 lg:w-10 flex-shrink-0 variant-filled-primary">
				<i class="bx bx-plus text-sm lg:text-xl" />
			</div>
		</div>
		{#if groups.length === 0}
			{#if searchQuery}
				<NotFoundGroupsData />
			{:else}
				<NoGroupsData />
			{/if}
		{:else}
			<div class="p-4 bg-surface-50-900-token space-y-1 rounded-lg h-full overflow-auto">
				{#each groups as group, i}
					<GroupCard id={group.id} title={group.title} isSelected={activeGroup?.id === group.id} />
				{/each}
			</div>
		{/if}
	</div>
	<div
		class="w-full flex-shrink-0 lg:w-8/12 xl:w-9/12 py-5 px-4 border rounded-lg border-surface-200-700-token"
	>
		{#if activeGroup === undefined}
			<div class="h-full">
				<NoSelectedGroup />
			</div>
		{:else}
			<GroupDetailHeader group={activeGroup} />
		{/if}
	</div>
</div>
