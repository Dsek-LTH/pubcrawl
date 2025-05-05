<script lang="ts">
	import { type ActionData } from './$types';
	import LoginAdminForm from '$lib/components/forms/LoginAdminForm.svelte';

	let { form }: { form: ActionData } = $props();
</script>

<svelte:head>
	<title>Pubcrawl - Login Admin</title>
</svelte:head>

<div class="flex flex-grow items-center">
	<LoginAdminForm {form} loginAction="?/login"></LoginAdminForm>
</div>
