<script lang="ts">
	import { drawerStore } from '@skeletonlabs/skeleton';
	import { superForm } from 'sveltekit-superforms/client';
	import { crudContentSchema, type ContentDigital } from '$lib/models/contents';
	import { onMount } from 'svelte';
	import FormErrorMessage from '$lib/compoenents/FormErrorMessage.svelte';

	const { form, reset, enhance, errors } = superForm<typeof crudContentSchema>(
		$drawerStore.meta.formObj,
		{
			validators: crudContentSchema,
			taintedMessage: undefined,
			onResult(event) {
				if (event.result.status === 200) {
					reset();
					drawerStore.close();
				}
			}
		}
	);
	const { host } = location;
	$: content = $drawerStore.meta.content as ContentDigital;

	onMount(() => {
		form.set({
			id: content.id,
			collectionId: content.collectionId,
			title: content.title,
			targetUrl: content.link.targetUrl,
			generatedUrl: content.link.url
		});
	});

	const urlPrefix = host + '/links/';
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

	<form class="h-full flex flex-col gap-6" action="/admin?/contents" method="POST" use:enhance>
		<div class="space-y-4 flex-1">
			<div class="flex flex-col gap-y-4">
				<input type="hidden" name="collectionId" bind:value={$form.collectionId} />
				<input type="hidden" name="id" bind:value={$form.id} />
				<label class="text-base space-y-1">
					<span class="font-semibold">Judul</span>
					<input
						type="text"
						class="input p-2 px-3 {$errors.title ? 'input-error' : ''}"
						name="title"
						bind:value={$form.title}
					/>
					<FormErrorMessage errors={$errors.title} />
				</label>
				<label class="text-base space-y-1">
					<span class="font-semibold">Link</span>
					<input
						type="text"
						name="targetUrl"
						class="input p-2 px-3 {$errors.targetUrl ? 'input-error' : ''}"
						bind:value={$form.targetUrl}
					/>
					<FormErrorMessage errors={$errors.targetUrl} />
				</label>
				<label class="text-sm space-y-1">
					<div class="flex justify-between">
						<span class="text-base font-semibold">Generated Link</span>
						<FormErrorMessage errors={$errors.generatedUrl} />
					</div>
					<div class="flex gap-x-3 items-center">
						<span class="text-sm">{urlPrefix}</span>
						<input
							class="input p-2 px-3 {$errors.generatedUrl ? 'input-error' : ''}"
							name="generatedUrl"
							bind:value={$form.generatedUrl}
						/>
					</div>
				</label>
				<div class="space-y-2">
					<p class="text-base font-semibold">Kode QR</p>
					<!-- <p class="text-base font-semibold">{urlPrefix}{$form.generatedUrl}</p> -->
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
