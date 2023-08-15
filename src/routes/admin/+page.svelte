<script>
	import { enhance } from '$app/forms';
	import NoDataImg from '$lib/assets/svg/NoDocuments.svg?raw';
</script>

<div class="flex flex-col gap-3">
	<h2 class="h2">Content Digital Management</h2>
	<p class="text-secondary-700-200-token">Memudahkan Anda dalam mengelola konten digital</p>
</div>

<div class="flex gap-8 mt-[52px]">
	<div
		class="hidden min-h-[65dvh] md:flex sm:w-6/12 md:w-5/12 lg:4/12 xl:3/12 pt-6 pb-5 px-4 bg-surface-100-800-token rounded-lg flex-col"
	>
		<h3 class="h3 mb-2">Daftar Buku</h3>
		<p class="text-sm text-secondary-700-200-token mb-3">
			Kelola Content digital untuk buku anda dengan mudah
		</p>
		<form class="flex gap-2 mb-6" use:enhance>
			<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
				<div class="input-group-shim"><i class="bx bx-search" /></div>
				<input class="py-2 px-3" type="text" placeholder="Cari" name="q" id="q" />
			</div>
			<div class="btn-icon flex-shrink-0 variant-filled-surface">
				<i class="bx bx-filter-alt text-xl text-on-surface-token" />
			</div>
			<div class="btn-icon flex-shrink-0 variant-filled-primary">
				<i class="bx bx-plus text-xl" />
			</div>
		</form>
		<div
			class="rounded-lg p-4 bg-surface-50-900-token flex-1 flex flex-col items-center justify-center my-auto gap-6"
		>
			{@html NoDataImg}
			<div class="spacing-2 text-center max-w-[249px]">
				<p class="font-medium">Belum terdapat buku</p>
				<p class="text-sm text-secondary-700-200-token">
					Tambahkan buku untuk agar dapat mengelola konten digital
				</p>
			</div>
			<div class="btn variant-filled-primary text-sm">Tambah buku</div>
		</div>
	</div>
	<div
		class="w-full sm:w-6/12 md:w-7/12 lg:w-8/12 xl:w-9/12 py-5 px-4 border rounded-lg border-surface-200-700-token"
	>
		Content book
	</div>
</div>
