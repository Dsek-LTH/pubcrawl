<script lang="ts">
	import LoginCounterForm from '$lib/components/forms/LoginCounterForm.svelte';
	import toast, { Toaster } from 'svelte-french-toast';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
	$effect(() => {
		if (form) {
			toast.error((Object.values(form.errors as object)[0] as string[])[0]);
		}
	});
</script>

<svelte:head>
	<title>Pubcrawl - Login Counter</title>
</svelte:head>
<Toaster />
<div class="flex flex-grow items-center">
	<LoginCounterForm loginAction="?/login"></LoginCounterForm>
</div>
