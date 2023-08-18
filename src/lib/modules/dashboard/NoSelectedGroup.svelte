<script lang="ts">
	import NoDataImg from '$lib/assets/svg/NoTasks.svg?raw';
</script>

<div
	class="rounded-lg p-4 h-full bg-surface-50-900-token flex-1 flex flex-col items-center justify-center my-auto gap-6"
>
	{@html NoDataImg}
	<div class="space-2 text-center max-w-[249px]">
		<p class="font-medium">Buku tidak ditemukan</p>
		<p class="text-sm text-secondary-700-200-token">Cobalah mencari dengan kata kunci yang lain</p>
	</div>
</div>
