<script>
	import { enhance } from '$app/forms';
</script>

<h1>Register Page</h1>
<form action="/auth?/register" method="POST" use:enhance>
	<input type="email" name="email" />
	<input type="password" name="password" />
	<input type="password" name="registerCode" />
	<input type="submit" />
</form>

<p>already have account? <a href="/login">Login</a></p>
