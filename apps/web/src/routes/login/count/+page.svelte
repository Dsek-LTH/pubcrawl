<script lang="ts">
	import LoginCounterForm from '$lib/components/forms/LoginCounterForm.svelte';
</script>

<svelte:head>
	<title>Pubcrawl - Login Counter</title>
</svelte:head>

<div class="flex flex-grow items-center">
	<LoginCounterForm loginAction="?/login"></LoginCounterForm>
</div>
