<script lang="ts">
	export let value: string;
</script>

<div
	class="input-group h-8 lg:h-10 lg:input-group-divider border-surface-200-700-token bg-surface-50-900-token grid-cols-[auto_1fr_auto]"
>
	<div class="!hidden lg:!flex !pr-1 bg-surface-50-900-token">
		<i class="bx bx-search" />
	</div>
	<input
		class="outline-none py-1 lg:py-2 px-2 lg:px-3 !border-l-0"
		type="text"
		placeholder="Cari"
		name="q"
		id="q"
		bind:value
	/>
</div>
