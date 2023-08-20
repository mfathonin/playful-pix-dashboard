<script lang="ts">
	import { editContentSchema } from '$lib/repositories/contents';
	import { drawerStore } from '@skeletonlabs/skeleton';
	import { superForm } from 'sveltekit-superforms/client';
	import type { ContentDigital } from '$lib/models/contents';
	import { onMount } from 'svelte';

	const { form, enhance, errors } = superForm<typeof editContentSchema>($drawerStore.meta.formObj, {
		validators: editContentSchema
	});

	$: content = $drawerStore.meta.collection as ContentDigital;

	onMount(() => {
		$form.title = content.title;
		$form.targetUrl = content.generatedLink.targetUrl;
		$form.url = content.generatedLink.url;
	});
</script>

<div class="flex flex-col gap-y-6 py-6 bg-surface-50-900-token px-5 h-full">
	<div class="flex justify-between items-center">
		<p class="h6">Edit Detail Konten</p>
		<button
			class="btn-icon btn-icon-sm text-lg hover:variant-soft"
			on:click|preventDefault|stopPropagation={() => drawerStore.close()}
		>
			<i class="bx bx-x" />
		</button>
	</div>

	<div class="space-y-1">
		<p class="h6 font-semibold">Edit detail konten</p>
		<p class="text-sm">Anda dapat mengubah detail informasi konten</p>
	</div>

	<form class="h-full flex flex-col gap-6">
		<div class="space-y-4 flex-1">
			<div class="flex flex-col gap-y-4">
				<label class="text-base space-y-1">
					<span class="font-semibold">Judul</span>
					<input type="text" class="input p-2 px-3" bind:value={$form.title} />
				</label>
				<label class="text-base space-y-1">
					<span class="font-semibold">Link</span>
					<input type="text" class="input p-2 px-3" bind:value={$form.targetUrl} />
				</label>
				<label class="text-sm space-y-1">
					<span class="text-base font-semibold">Generated Link</span>
					<div class="flex gap-x-3 items-center">
						<span class="text-sm">https://playfulpix.com/link/</span>
						<input class="input p-2 px-3" bind:value={$form.url} />
					</div>
				</label>
				<div class="space-y-2">
					<p class="text-base font-semibold">Kode QR</p>
					<div
						class="flex gap-x-3 items-center h-32 w-32 p-2 border border-surface-200-700-token rounded-md"
					>
						<div class="h-full w-full bg-surface-600-300-token" />
					</div>
				</div>
			</div>
		</div>
		<hr />
		<button class="btn variant-filled w-full">Simpan</button>
	</form>
</div>
