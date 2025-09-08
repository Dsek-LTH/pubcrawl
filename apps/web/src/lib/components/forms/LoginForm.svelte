<script lang="ts">
	import { enhance } from '$app/forms';

	let {
		loginAction,
		loginType,
		placeholder
	}: { loginAction: string; loginType: string; placeholder: string } = $props();
</script>

<form class="flex w-full flex-row justify-center" method="POST" action={loginAction} use:enhance>
	<div class="card bg-base-300">
		<div class="card-body">
			<h1 class="card-title">{loginType}</h1>
			<input class="input mr-1" type="password" name="key" {placeholder} />
			<button class="btn btn-primary ml-1">Login</button>
		</div>
	</div>
</form>
