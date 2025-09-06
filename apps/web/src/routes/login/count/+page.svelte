<script lang="ts">
	import toast, { Toaster } from 'svelte-french-toast';
	import type { ActionData } from './$types';
	import LoginForm from '$lib/components/forms/LoginForm.svelte';

	let { form }: { form: ActionData } = $props();
	$effect(() => {
		if (form) {
			toast.error((Object.values(form.errors as object)[0] as string[])[0]);
		}
	});
</script>

<svelte:head>
	<title>Pubcrawl - Login Count</title>
</svelte:head>
<Toaster />
<div class="flex flex-grow items-center">
	<LoginForm loginType="Counter Login" placeholder="Pub key" loginAction="?/login" />
</div>
