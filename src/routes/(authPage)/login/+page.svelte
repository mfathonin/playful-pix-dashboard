<script lang="ts">
	import FormErrorMessage from '$lib/compoenents/FormErrorMessage.svelte';
	import { loginSchema } from '../../auth/constants';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';

	export let data: PageData;
	const { form, errors, enhance } = superForm(data.form, {
		validators: loginSchema,
		taintedMessage: undefined
	});
</script>

<h1 class="h2">Logo</h1>

<form
	class="w-auto text-start flex flex-col gap-y-3"
	action="/auth?/login"
	method="POST"
	use:enhance
>
	<label class="label">
		<span>Email</span>
		<input
			class={`input p-2 ${$errors.email ? 'input-error' : ''}`}
			title="Email"
			name="email"
			placeholder="Masukan email Anda"
			aria-invalid={$form.email ? 'true' : undefined}
			bind:value={$form.email}
		/>
		<FormErrorMessage errors={$errors.email} />
	</label>
	<label class="label">
		<span>Password</span>
		<input
			class={`input p-2 ${$errors.password ? 'input-error' : ''}`}
			type="password"
			title="Password"
			name="password"
			placeholder="Masukan password Anda"
			aria-invalid={$form.password ? 'true' : undefined}
			bind:value={$form.password}
		/>
		<FormErrorMessage errors={$errors.password} />
	</label>
	<button class="btn variant-filled-primary p-2 mt-4 w-full" type="submit">Masuk</button>
</form>

<p>
	Belum punya akun? <a class="anchor" href="/register">Daftar disini</a>
</p>
