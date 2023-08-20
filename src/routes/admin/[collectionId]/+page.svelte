<script lang="ts">
	import GroupDetailHeader from '$lib/modules/dashboard/GroupDetailHeader.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	$: activeGroup = data.group;
</script>

<GroupDetailHeader group={activeGroup} />
