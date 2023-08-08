<script>
	import { enhance } from '$app/forms';
</script>

<h1>Login page</h1>
<form action="?/login" method="POST" use:enhance>
	<input type="email" name="email" />
	<input type="password" name="password" />
	<input type="submit" />
</form>

<p>dont have account? <a href="/register">register here.</a></p>
