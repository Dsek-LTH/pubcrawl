<script lang="ts">
    import { enhance } from "$app/forms";
    import { type ActionData } from "./$types"
    import { type PubKey } from "$lib/types.ts";

    let { form, deleteAction, pubKeys }: { form: ActionData, deleteAction: string, pubKeys: PubKey[]} = $props();
</script>

<div class="card w-6/12 bg-base-300">
    <div class="card-body">
        <h2 class="card-title">Delete Pub/Key-pair</h2>
<form class="flex flex-col gap-1" method="POST" action={deleteAction} use:enhance>
    <div>
        <select class="select w-full" name="pubKey">
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
    <button class="btn btn-primary" type="submit">Delete</button>
</form>
</div>
</div>