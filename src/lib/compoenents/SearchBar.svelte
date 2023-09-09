<script lang="ts">
	export let value: string;
</script>

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
