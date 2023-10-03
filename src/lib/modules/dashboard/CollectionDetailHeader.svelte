<script lang="ts">
	import type { Collection } from '$lib/models/collections';

	export let collection: Collection;
	$: sortedAttribut = collection.attributes?.sort((a, b) => a.key.localeCompare(b.key));
</script>

<div class="space-y-1">
	<p class="text-secondary-700-200-token opacity-70 text-sm">Detail Koleksi</p>
	<h4 class="h4 font-semibold">{collection.name}</h4>
</div>
{#if sortedAttribut}
	<div class="table-container mt-4">
		<table class="table !bg-transparent border-transparent">
			<tbody>
				{#each sortedAttribut as attr}
					<tr class="table-row !border-transparent !bg-transparent">
						<td
							class="table-cell !py-1 !px-0 w-1/2 md:w-1/5 lg:w-2/12 text-secondary-700-200-token opacity-70"
							>{attr.key}</td
						>
						<td class="table-cell !py-1">
							<span class="font-medium">{attr.value}</span>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}
