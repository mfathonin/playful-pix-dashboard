<script lang="ts">
	import { createCollectionSchema } from '$lib/models/contents';
	import type { Collection } from '$lib/models/collections';
	import { drawerStore } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import FormErrorMessage from '$lib/compoenents/FormErrorMessage.svelte';
	// import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	const isEditing = $drawerStore.meta.collectionId !== undefined;

	let errors: Record<string, any> = {};
	const {
		form,
		validate,
		errors: formErrors,
		constraints
	} = superForm<typeof createCollectionSchema>($drawerStore.meta.formObj, {
		validators: createCollectionSchema,
		taintedMessage: undefined,
		dataType: 'json',
		onResult({ result }) {
			console.log(1349, result);

			if (result.status === 200) {
				drawerStore.close();
			}
		}
	});

	const addAttributes = () => {
		form.set({ attributes: [...$form.attributes, { key: '', value: '' }], name: $form.name });
	};

	const deleteAttribute = (index: number) => {
		form.set({ attributes: $form.attributes.filter((_, i) => i !== index), name: $form.name });
	};

	onMount(() => {
		if (isEditing) {
			const { name, attributes } = $drawerStore.meta.collection as Collection;
			form.set({
				name,
				attributes: attributes
					? Object.entries(attributes).map((keyVal) => ({ key: keyVal[0], value: keyVal[1] }))
					: []
			});
		}
	});

	const validateForm = async () => {
		const { errors: formErrors } = await validate();
		errors = formErrors;
	};

	const handleSubmit = async () => {
		const { valid: isValid, errors: formErrors, data } = await validate();
		if (isValid) {
			if (isEditing) await handleUpdate(data);
			else await handleCreate(data);
		} else {
			console.error('invalid', formErrors);
			errors = formErrors;
		}
	};
	const handleCreate = async (data: (typeof createCollectionSchema)['_type']) => {
		const res = await fetch('/api/v1/admin/collections', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		drawerStore.close();
	};
	const handleUpdate = async (data: (typeof createCollectionSchema)['_type']) => {
		const res = await fetch(`/api/v1/admin/collections/${$drawerStore.meta.collectionId}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		drawerStore.close();
	};
</script>

<div
	class="flex flex-col gap-y-6 py-6 px-5 bg-surface-50-900-token rounded-xl dark:border dark:border-surface-800 h-full"
>
	<div class="flex justify-between items-center">
		<p class="h6">{isEditing ? 'Ubah' : 'Tambah'} Koleksi</p>
		<button
			class="btn-icon btn-icon-sm text-lg hover:variant-soft"
			on:click|preventDefault|stopPropagation={() => drawerStore.close()}
		>
			<i class="bx bx-x" />
		</button>
	</div>

	<div class="space-y-1">
		<p class="h6 font-semibold">{isEditing ? 'Ubah' : 'Tambah'} koleksi</p>
		{#if isEditing}
			<p class="text-sm">Anda dapat mengubah informasi detail koleksi anda</p>
		{:else}
			<p class="text-sm">Lengkapi form dibawah untuk menambahkan koleksi baru</p>
		{/if}
	</div>

	<form
		class="h-full flex flex-col gap-6"
		on:submit|preventDefault|stopPropagation={handleSubmit}
		on:change={validateForm}
	>
		<div class="space-y-4 flex-1">
			<div class="flex flex-col gap-y-4">
				<label class="text-base space-y-1">
					<span class="font-semibold">Nama koleksi</span>
					<input
						type="text"
						placeholder="Masukan nama koleksi"
						name="name"
						class="input p-2 px-3"
						bind:value={$form.name}
					/>
					<FormErrorMessage errors={errors.name} />
				</label>
				<!-- Attributes section. Dropdown menu with plus button for adding new attributes -->
				<div class="flex justify-between items-center">
					<p class="text-base font-semibold">Properti</p>
					<button
						class="btn-icon btn-icon-sm text-lg hover:variant-soft"
						on:click|preventDefault|stopPropagation={addAttributes}
					>
						<i class="bx bx-plus" />
					</button>
				</div>
				{#if Object.entries($form.attributes).length === 0}
					<p class="text-sm opacity-30 italic">Tambahkan properti yang anda butuhkan</p>
				{:else}
					{#key $form.attributes.length}
						{#each $form.attributes as _, index}
							<div class="flex gap-x-4 items-start">
								<label class="w-2/5 flex-shrink-0">
									<input
										type="text"
										placeholder="Masukan nama properti"
										name="attributes"
										class="input p-2 px-3"
										bind:value={$form.attributes[index].key}
									/>
									<FormErrorMessage errors={errors.attributes?.[index]?.key} />
								</label>
								<label class="flex-1">
									<input
										type="text"
										placeholder="Masukan nilai properti"
										name="attributes"
										class="input p-2 px-3"
										bind:value={$form.attributes[index].value}
									/>
									<FormErrorMessage errors={errors.attributes?.[index]?.value} />
								</label>
								<div class="flex h-11 justify-center items-center">
									<button
										class="btn-icon btn-icon-sm flex-shrink-0 w-8 h-8 text-lg hover:variant-soft"
										on:click|preventDefault|stopPropagation={() => deleteAttribute(index)}
									>
										<i class="bx bx-trash" />
									</button>
								</div>
							</div>
						{/each}
					{/key}
				{/if}
				<!-- <SuperDebug data={$form} /> -->
			</div>
		</div>
		<hr class="-mx-5" />
		<button class="btn variant-filled w-full">{isEditing ? 'Simpan' : 'Tambah'} koleksi</button>
	</form>
</div>
