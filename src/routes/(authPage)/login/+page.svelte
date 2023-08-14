<script>
	import { enhance } from '$app/forms';
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
		<input class="input p-2" type="email" title="Email" name="email" />
	</label>
	<label class="label">
		<span>Password</span>
		<input class="input p-2" type="password" title="Password" name="password" />
	</label>
	<button class="btn variant-filled-primary p-2 mt-4 w-full" type="submit">Masuk</button>
</form>

<p>
	Belum punya akun? <a class="anchor" href="/register">Daftar disini</a>
</p>
