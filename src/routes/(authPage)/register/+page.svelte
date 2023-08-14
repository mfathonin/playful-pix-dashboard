<script lang="ts">
	import FormErrorMessage from '$lib/compoenents/FormErrorMessage.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { registerSchema } from '../../auth/constants';
	import type { PageData } from './$types';

	export let data: PageData;

	const { form, errors, enhance } = superForm(data.form, {
		validators: registerSchema,
		taintedMessage: undefined
	});
</script>

<h1 class="h2">Logo</h1>

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
			bind:value={$form.email}
		/>
		<FormErrorMessage errors={$errors.email} />
	</label>
	<label class="label" aria-required="true">
		<span>Password</span>
		<input class={'input p-2'} type="password" name="password" bind:value={$form.password} />
		<FormErrorMessage errors={$errors.password} />
	</label>
	<label class="label" aria-required="true">
		<span>Kode Pendaftaran</span>
		<input
			class={`input p-2 mb-10 ${$errors.registerCode ? 'input-error' : ''}`}
			type="password"
			name="registerCode"
			bind:value={$form.registerCode}
		/>
		<FormErrorMessage errors={$errors.registerCode} />
	</label>
	<button class="btn variant-filled-primary p-2 mt-4 w-full" type="submit">Daftar</button>
</form>

<p>Sudah punya akun? <a class="anchor" href="/login">Masuk</a></p>
