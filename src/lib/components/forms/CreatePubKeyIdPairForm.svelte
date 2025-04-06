<script lang="ts">
    import { enhance } from "$app/forms";
    import { type ActionData } from "./$types"
    import { type PubId } from "$lib/types.ts";

    let { form, createAction, pubIds }: {form: ActionData, updateAction: string, pubIds: PubId[]} = $props();
</script>

<form method="POST" action={createAction} use:enhance>
    <div>
        <span>Counter Key:</span>
        <input type="text" name="pubKey"/>
        {#if form?.errors?.pubKey}
            <p class="error">{form.errors.pubKey[0]}</p>
        {/if}
    </div>
    <div>
        <span>Pub:</span>
        <select name="pubId">
            <option value="" selected disabled hidden>Select pub</option>
            {#each pubIds as pubIdOption}
                <option value={pubIdOption}>{pubIdOption}</option>
            {/each}
        </select>
        {#if form?.errors?.pubId}
            <p class="error">{form.errors.pubId[0]}</p>
        {/if}
    </div>
    {#if form?.errors?.general}
        <p class="error">{form.errors.general[0]}</p>
    {/if}
    <button type="submit">Create</button>
</form>