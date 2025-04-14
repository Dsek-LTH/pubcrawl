<script lang="ts">
	import { type ActionData } from './$types';
	import LoginCounterForm from '$lib/components/forms/LoginCounterForm.svelte';

	let { form }: { form: ActionData } = $props();
</script>

<svelte:head>
	<title>Pubcrawl - Login Counter</title>
</svelte:head>

<div class="flex flex-grow items-center">
	<LoginCounterForm {form} loginAction="?/login"></LoginCounterForm>
</div>
