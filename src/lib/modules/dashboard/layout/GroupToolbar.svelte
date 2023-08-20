<script lang="ts">
	export let value: string;
</script>

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
			bind:value
		/>
	</div>
	<div class="btn-icon h-8 w-8 lg:h-10 lg:w-10 flex-shrink-0 variant-filled-surface">
		<i class="bx bx-filter-alt text-sm lg:text-xl text-on-surface-token" />
	</div>
	<div class="btn-icon h-8 lg:h-10 w-8 lg:w-10 flex-shrink-0 variant-filled-primary">
		<i class="bx bx-plus text-sm lg:text-xl" />
	</div>
</div>
