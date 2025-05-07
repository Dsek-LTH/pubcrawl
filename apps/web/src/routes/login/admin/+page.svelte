<script lang="ts">
	import { type ActionData } from './$types';
	import LoginAdminForm from '$lib/components/forms/LoginAdminForm.svelte';
	import toast, { Toaster } from 'svelte-french-toast';

	let { form }: { form: ActionData } = $props();
	$effect(() => {
		if (form) {toast.error((Object.values(form.errors as object)[0] as string[])[0])}
	});
</script>

<svelte:head>
	<title>Pubcrawl - Login Admin</title>
</svelte:head>
<Toaster/>
<div class="flex flex-grow items-center">
	<LoginAdminForm {form} loginAction="?/login"></LoginAdminForm>
</div>
