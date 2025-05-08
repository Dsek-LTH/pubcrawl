<script lang="ts">
	import { enhance } from '$app/forms';

	let { loginAction }: { loginAction: string } = $props();
</script>

<form class="flex w-full flex-row justify-center" method="POST" action={loginAction} use:enhance>
	<input class="input mr-1" type="password" name="adminKey" placeholder="Admin Key" />
	<button class="btn btn-primary ml-1">Login</button>
</form>
