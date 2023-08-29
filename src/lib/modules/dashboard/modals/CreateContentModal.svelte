<script lang="ts">
	import FormErrorMessage from '$lib/compoenents/FormErrorMessage.svelte';
	import { createContentSchema } from '$lib/models/contents';
	import { drawerStore } from '@skeletonlabs/skeleton';
	import { superForm } from 'sveltekit-superforms/client';

	const { form, enhance, errors } = superForm<typeof createContentSchema>(
		$drawerStore.meta.formObj,
		{
			validators: createContentSchema,
			taintedMessage: undefined,
			onSubmit({ formData, cancel }) {
				const collectionId = formData.get('collectionId');
				if (!collectionId) cancel();
			},
			onResult({ result }) {
				console.log(1349, result);

				if (result.status === 200) {
					drawerStore.close();
				}
			}
		}
	);
</script>

<div class="flex flex-col gap-y-6 py-6 bg-surface-50-900-token px-5 h-full">
	<div class="flex justify-between items-center">
		<p class="h6">Tambah Detail Konten</p>
		<button
			class="btn-icon btn-icon-sm text-lg hover:variant-soft"
			on:click|preventDefault|stopPropagation={() => drawerStore.close()}
		>
			<i class="bx bx-x" />
		</button>
	</div>

	<div class="space-y-1">
		<p class="h6 font-semibold">Tambah detail konten</p>
		<p class="text-sm">Lengkapi form dibawah untuk menambahkan konten digital</p>
	</div>

	<form
		class="h-full flex flex-col gap-6"
		action="/api/v1/admin/contents"
		method="POST"
		use:enhance
	>
		<div class="space-y-4 flex-1">
			<div class="flex flex-col gap-y-4">
				<input type="hidden" name="collectionId" bind:value={$drawerStore.meta.collectionId} />
				<label class="text-base space-y-1">
					<span class="font-semibold">Judul</span>
					<input type="text" name="title" class="input p-2 px-3" bind:value={$form.title} />
					<FormErrorMessage errors={$errors.title} />
				</label>
				<label class="text-base space-y-1">
					<span class="font-semibold">Link</span>
					<input type="text" name="targetUrl" class="input p-2 px-3" bind:value={$form.targetUrl} />
					<FormErrorMessage errors={$errors.targetUrl} />
				</label>
			</div>
		</div>
		<hr />
		<button class="btn variant-filled w-full">Tambah konten</button>
	</form>
</div>
