<svelte:head>
    <title>Pubcrawl - Login Counter</title>
</svelte:head>

<script lang="ts">
    import { type ActionData } from "./$types";
    import LoginCounterForm from "$lib/components/forms/LoginCounterForm.svelte"

    let { form }: { form: ActionData } = $props();
</script>

<LoginCounterForm form={form} loginAction="?/login">
</LoginCounterForm>