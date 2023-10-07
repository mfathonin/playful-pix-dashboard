<script lang="ts">
	import FormErrorMessage from '$lib/compoenents/FormErrorMessage.svelte';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import { superForm } from 'sveltekit-superforms/client';
	import { loginSchema } from '../../auth/constants';
	import type { PageData } from './$types';

	export let data: PageData;
	const { form, errors, enhance, message } = superForm(data.form, {
		validators: loginSchema,
		taintedMessage: undefined,
		onResult() {
			isSubmitting = false;
		}
	});

	let isSubmitting = false;
</script>

<h1 class="h2 text-primary-400-500-token">Logo</h1>
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
	<button
		class="btn variant-filled-primary p-2 mt-4 w-full gap-x-2"
		type="submit"
		on:click={() => {
			isSubmitting = true;
		}}
	>
		<span class="w-6" />
		<span>Masuk</span>
		{#if isSubmitting}
			<ProgressRadial width="w-6 h-6" stroke={110} />
		{:else}
			<span class="w-6" />
		{/if}
	</button>
</form>
<p>
	Belum punya akun? <a class="anchor" href="/register">Daftar disini</a>
</p>
