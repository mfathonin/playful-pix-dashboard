<script>
	import { enhance } from '$app/forms';
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
		<input class="input p-2" type="email" name="email" required />
	</label>
	<label class="label" aria-required="true">
		<span>Password</span>
		<input class="input p-2" type="password" name="password" required />
	</label>
	<label class="label" aria-required="true">
		<span>Kode Pendaftaran</span>
		<input class="input p-2 mb-10" type="password" name="registerCode" required />
	</label>
	<button class="btn variant-filled-primary p-2 mt-4 w-full" type="submit">Daftar</button>
</form>

<p>Sudah punya akun? <a class="anchor" href="/login">Masuk</a></p>
