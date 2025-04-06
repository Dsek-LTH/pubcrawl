<script lang="ts">
    import { enhance } from "$app/forms";
    import { type ActionData } from "./$types"
    import { type PubKey } from "$lib/types.ts";

    let { form, deleteAction, pubKeys }: { form: ActionData, updateAction: string, pubKeys: PubKey[]} = $props();
</script>

<form method="POST" action={deleteAction} use:enhance>
    <div>
        <span>Counter Key:</span>
        <select name="pubKey">
            <option value="" selected disabled hidden>Select counter key</option>
            {#each pubKeys as pubKeyOption}
                <option value={pubKeyOption}>{pubKeyOption}</option>
            {/each}
        </select>
        {#if form?.errors?.pubKey}
            <p class="error">{form.errors.pubKey[0]}</p>
        {/if}
    </div>
    {#if form?.errors?.general}
        <p class="error">{form.errors.general[0]}</p>
    {/if}
    <button type="submit">Delete</button>
</form>