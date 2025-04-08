<script lang="ts">
    import { enhance } from "$app/forms";
    import { type ActionData } from "./$types";

    let { form, loginAction }: { form: ActionData, loginAction: string } = $props();
</script>

<form class="flex flex-row justify-center w-full" method="POST" action={loginAction} use:enhance>
    <input class="input mr-1" type="password" name="pubKey" placeholder="Pub Key">
    {#if form?.errors?.pubKey}
        <p class="error">{form.errors.pubKey[0]}</p>
    {/if}

    {#if form?.errors?.general}
        <p class="error">{form.errors.general[0]}</p>
    {/if}

    <button class="btn btn-primary ml-1">Login</button>
</form>
