<script lang="ts">
	import GroupDetailHeader from '$lib/modules/dashboard/GroupDetailHeader.svelte';
	import { drawerStore, popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import ContentCard from '$lib/modules/dashboard/ContentCard.svelte';

	export let data: PageData;
	$: activeGroup = data.group;
	$: collections = data.collections;
</script>

<GroupDetailHeader group={activeGroup} />
{#if collections}
	<div class="space-y-3 mt-8">
		{#each collections as collectionData, i}
			<ContentCard {collectionData} />
		{/each}
	</div>
{/if}
