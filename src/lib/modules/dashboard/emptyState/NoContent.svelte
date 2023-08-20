<script lang="ts">
	import NoDataImg from '$lib/assets/svg/NoDocuments.svg?raw';
</script>

<div
	class="rounded-lg p-4 bg-surface-50-900-token flex-1 flex flex-col items-center justify-center my-auto gap-6"
>
	{@html NoDataImg}
	<div class="space-2 text-center max-w-[249px]">
		<p class="font-medium">Belum terdapat konten</p>
		<p class="text-sm text-secondary-700-200-token">Tambahkan konten digital untuk buku anda</p>
	</div>
	<div class="btn variant-filled-primary cursor-pointer text-sm">
		<i class="bx bx-plus mr-2" />Tambah konten
	</div>
</div>
