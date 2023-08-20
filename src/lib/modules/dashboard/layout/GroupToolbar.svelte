<script lang="ts">
	import SearchBar from '$lib/compoenents/SearchBar.svelte';

	export let value: string;
</script>

<h3 class="h3 mb-2">Daftar Buku</h3>
<p class="text-sm text-secondary-700-200-token mb-3">
	Kelola Content digital untuk buku anda dengan mudah
</p>
<div class="flex gap-2 mb-6">
	<SearchBar bind:value />
	<div class="btn-icon h-8 w-8 lg:h-10 lg:w-10 flex-shrink-0 variant-filled-surface">
		<i class="bx bx-filter-alt text-sm lg:text-xl text-on-surface-token" />
	</div>
	<div class="btn-icon h-8 lg:h-10 w-8 lg:w-10 flex-shrink-0 variant-filled-primary">
		<i class="bx bx-plus text-sm lg:text-xl" />
	</div>
</div>
