<script>
	import { enhance } from '$app/forms';
</script>

<h1>Welcome to Dashboad</h1>
<form method="post" action="/auth?/logout" use:enhance>
	<button>Logout</button>
</form>
