<script lang="ts">
	import type { Group } from '$lib/models/groups';

	export let group: Group;
</script>

<div class="space-y-1">
	<p class="text-secondary-500-400-token text-sm">Detail Buku</p>
	<h4 class="h4 font-semibold">{group.title}</h4>
</div>
{#if group.attributes}
	<div class="table-container mt-4">
		<table class="table !bg-transparent border-transparent">
			<tbody>
				{#each Object.entries(group.attributes) as attr}
					<tr class="table-row !border-transparent !bg-transparent">
						<td class="table-cell !py-1 !px-0 w-1/2 md:w-1/5 lg:w-2/12 text-secondary-400-500-token"
							>{attr[0]}</td
						>
						<td class="table-cell !py-1">
							<span class="font-medium">{attr[1].join(', ')}</span>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}
