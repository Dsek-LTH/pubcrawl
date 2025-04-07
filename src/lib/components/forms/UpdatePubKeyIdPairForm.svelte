<script lang="ts">
    import { enhance } from "$app/forms";
    import { type ActionData } from "./$types"
    import { type PubId, type PubKey } from "$lib/types.ts";

    let { form, updateAction, pubKey, pubId, pubIds }: {form: ActionData, updateAction: string, pubKey: PubKey, pubId: PubId, pubIds: PubId[]} = $props();
</script>

<form method="POST" action={updateAction} use:enhance={() => {
    return async ({ update }) => {
      update({ reset: false });
    };
}}>
    <div>
        <span>Counter Key:</span>
        <input type="hidden" name="oldPubKey" value={pubKey}/>
        <input type="text" name="pubKey" value={pubKey}/>
        {#if form?.errors?.pubKey}
            <p class="error">{form.errors.pubKey[0]}</p>
        {/if}
    </div>
    <div>
        <span>Pub:</span>
        <select name="pubId">
            {#each pubIds as pubIdOption}
                <option value={pubIdOption} selected={pubIdOption === pubId}>{pubIdOption}</option>
            {/each}
        </select>
        {#if form?.errors?.pubId}
            <p class="error">{form.errors.pubId[0]}</p>
        {/if}
    </div>
    {#if form?.errors?.general}
        <p class="error">{form.errors.general[0]}</p>
    {/if}
    <button type="submit">Update</button>
</form>