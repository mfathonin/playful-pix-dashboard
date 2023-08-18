<script lang="ts">
	import { goto } from '$app/navigation';

	export let id: string;
	export let title: string;
	export let isSelected: boolean = false;

	const navigateToDetail = () => {
		if (id === undefined) return;
		if (isSelected) return goto(`/admin`, { keepFocus: true, invalidateAll: true });
		goto(`/admin/${id}`, { keepFocus: true, invalidateAll: true });
	};
</script>

<button
	class="flex w-full text-start py-1 px-4 pr-1 h-11 gap-x-1 group border border-transparent hover:border-primary-400-500-token hover:bg-primary-300-600-token rounded-lg items-center cursor-pointer {isSelected
		? 'bg-primary-200-700-token'
		: ''}"
	on:click={navigateToDetail}
>
	<span class="flex-1 text-ellipsis line-clamp-1">{title}</span>
	<div class="btn-icon btn-sm h-8 w-8 hidden group-hover:flex hover:variant-soft">
		<i class="bx bx-dots-horizontal-rounded" />
	</div>
</button>
