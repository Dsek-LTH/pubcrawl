<svelte:head>
    <title>Pubcrawl - Login Admin</title>
</svelte:head>

<script lang="ts">
    import { type ActionData } from "./$types";
    import LoginAdminForm from "$lib/components/forms/LoginAdminForm.svelte"

    let { form }: { form: ActionData } = $props();
</script>

<LoginAdminForm form={form} loginAction="?/login">
</LoginAdminForm>
