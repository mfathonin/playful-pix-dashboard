<script lang="ts">
	export let title: string;
</script>

<div
	class="flex py-1 px-4 pr-1 h-11 gap-x-1 group border border-transparent hover:border-primary-400-500-token hover:bg-primary-200-700-token rounded-lg items-center cursor-pointer"
>
	<span class="flex-1 text-ellipsis line-clamp-1">{title}</span>
	<div class="btn-icon btn-sm h-8 w-8 hidden group-hover:flex hover:variant-soft">
		<i class="bx bx-dots-horizontal-rounded" />
	</div>
</div>
