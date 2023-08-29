<script lang="ts">
	import { drawerStore } from '@skeletonlabs/skeleton';
	import { superForm } from 'sveltekit-superforms/client';
	import { editContentSchema, type ContentDigital } from '$lib/models/contents';
	import { onMount } from 'svelte';
	import FormErrorMessage from '$lib/compoenents/FormErrorMessage.svelte';
	import { json } from '@sveltejs/kit';

	let errors: Record<string, string[]> = {};
	const { form, validate } = superForm<typeof editContentSchema>($drawerStore.meta.formObj, {
		validators: editContentSchema,
		taintedMessage: undefined,
		validationMethod: 'onblur'
	});

	$: content = $drawerStore.meta.collection as ContentDigital;

	onMount(() => {
		form.set({
			title: content.title,
			targetUrl: content.generatedLink.targetUrl,
			url: content.generatedLink.url
		});
	});

	const handleSubmit = async (event: Event) => {
		const { valid: isValid, errors: formErrors, data } = await validate();
		errors = formErrors;
		if (isValid) {
			const res = await fetch(`/api/v1/admin/contents/${content.id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			});
			console.log('valid', data, res, await res.json());
		} else {
			console.error('invalid', errors);
		}
	};

	const validateForm = async () => {
		const { errors: formErrors } = await validate();
		errors = formErrors;
	};
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

	<form
		class="h-full flex flex-col gap-6"
		on:submit|preventDefault|stopPropagation={handleSubmit}
		on:change|preventDefault|stopPropagation={validateForm}
	>
		<div class="space-y-4 flex-1">
			<div class="flex flex-col gap-y-4">
				<label class="text-base space-y-1">
					<span class="font-semibold">Judul</span>
					<input
						type="text"
						class="input p-2 px-3 {errors.title ? 'input-error' : ''}"
						bind:value={$form.title}
					/>
					<FormErrorMessage errors={errors.title} />
				</label>
				<label class="text-base space-y-1">
					<span class="font-semibold">Link</span>
					<input
						type="text"
						class="input p-2 px-3 {errors.targetUrl ? 'input-error' : ''}"
						bind:value={$form.targetUrl}
					/>
					<FormErrorMessage errors={errors.targetUrl} />
				</label>
				<label class="text-sm space-y-1">
					<div class="flex justify-between">
						<span class="text-base font-semibold">Generated Link</span>
						<FormErrorMessage errors={errors.url} />
					</div>
					<div class="flex gap-x-3 items-center">
						<span class="text-sm">https://playfulpix.com/link/</span>
						<input
							class="input p-2 px-3 {errors.url ? 'input-error' : ''}"
							bind:value={$form.url}
						/>
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
