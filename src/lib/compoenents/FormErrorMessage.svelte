<script lang="ts">
	export let errors: string[] | undefined;
</script>

{#if errors}
	<small class="text-xs px-2 text-error-500">{errors[0]}</small>
{/if}
