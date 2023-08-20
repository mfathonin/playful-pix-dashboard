<script lang="ts">
	import { page } from '$app/stores';
	import type { Group } from '$lib/models/groups';
	import GroupDetailHeader from '$lib/modules/dashboard/GroupDetailHeader.svelte';
	import NoSelectedGroup from '$lib/modules/dashboard/NoSelectedGroup.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const groups = $page.data.groups as Group[];

	$: activeGroup = groups.find((group) => group.id === data.collectionId);
</script>

{#if activeGroup === undefined}
	<div class="h-full">
		<NoSelectedGroup />
	</div>
{:else}
	<GroupDetailHeader group={activeGroup} />
	<slot />
{/if}
