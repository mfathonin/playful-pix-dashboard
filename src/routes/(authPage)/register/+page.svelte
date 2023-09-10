<script lang="ts">
	import FormErrorMessage from '$lib/compoenents/FormErrorMessage.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { registerSchema } from '../../auth/constants';
	import type { PageData } from './$types';
	import { ProgressRadial } from '@skeletonlabs/skeleton';

	export let data: PageData;

	const { form, errors, enhance, message } = superForm(data.form, {
		validators: registerSchema,
		taintedMessage: undefined,
		onResult() {
			isSubmitting = false;
		}
	});
	let isSubmitting = false;
</script>

<h1 class="h2">Logo</h1>
{#if $message}
	<div class="py-4 border border-error-300-600-token text-center text-error-500 rounded-lg">
		<p class="h-5">{$message}</p>
	</div>
{:else}
	<div class="p-4">
		<p class="h-5">{' '}</p>
	</div>
{/if}
<form
	class="w-auto text-start flex flex-col gap-y-4"
	action="/auth?/register"
	method="POST"
	use:enhance
>
	<label class="label" aria-required="true">
		<span>Email</span>
		<input
			class={`input p-2 ${$errors.email ? 'input-error' : ''}`}
			name="email"
			placeholder="Masukan email Anda"
			bind:value={$form.email}
		/>
		<FormErrorMessage errors={$errors.email} />
	</label>
	<label class="label" aria-required="true">
		<span>Password</span>
		<input
			class={'input p-2'}
			type="password"
			name="password"
			placeholder="Masukan password Anda"
			bind:value={$form.password}
		/>
		<FormErrorMessage errors={$errors.password} />
	</label>
	<label class="label" aria-required="true">
		<span>Kode Pendaftaran</span>
		<input
			class={`input p-2 mb-10 ${$errors.registerCode ? 'input-error' : ''}`}
			type="password"
			name="registerCode"
			placeholder="Masukan kode register"
			bind:value={$form.registerCode}
		/>
		<FormErrorMessage errors={$errors.registerCode} />
	</label>
	<button class="btn variant-filled-primary p-2 mt-4 w-full" type="submit">
		<span class="w-6" />
		<span>Daftar</span>
		{#if isSubmitting}
			<ProgressRadial width="w-6 h-6" stroke={110} />
		{:else}
			<span class="w-6" />
		{/if}
	</button>
</form>

<p>Sudah punya akun? <a class="anchor" href="/login">Masuk</a></p>
