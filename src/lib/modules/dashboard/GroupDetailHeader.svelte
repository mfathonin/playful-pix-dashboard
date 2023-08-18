<script lang="ts">
	import type { Group } from '$lib/models/groups';

	export let group: Group;
	console.log(Object.entries(group.attributes || {}));
</script>

<div class="space-y-5">
	<div class="space-y-1">
		<h4 class="h4">{group.title}</h4>
	</div>
	<div class="space-y-3 table-container">
		{#if group.attributes}
			<table class="table table-compact bg-transparent border-transparent">
				<tbody>
					{#each Object.entries(group.attributes) as attr}
						<tr class="table-row !border-transparent !bg-transparent">
							<td class="table-cell !px-0 w-1/2 md:w-1/5 lg:w-2/12">
								<div class="flex justify-between">
									<span>{attr[0]}</span>
									<span>:</span>
								</div>
							</td>
							<td>{attr[1].join(', ')}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{/if}
	</div>
</div>
