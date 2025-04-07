<script lang="ts">
    import { enhance } from "$app/forms";
    import { type ActionData } from "./$types"
    import { type PubId, type PubKey, type Pub, type Theme } from "$lib/types.ts";

    let { form, updateAction, pubKey, pubId, themes, pubs, pubIds }: {form: ActionData, pubs: Pub, themes: Theme, updateAction: string, pubKey: PubKey, pubId: PubId, pubIds: PubId[]} = $props();
    let themeColor = $state("#000000");
    if (pubs != undefined && pubs[pubId] != undefined && themes != undefined && themes[pubs[pubId].themeId] != undefined) {
        themeColor = themes[pubs[pubId].themeId].color;
    }
    console.log(themeColor)
</script>
<div class="card card-sm bg-base-300 border-l-6" style="border-color:{themeColor};">
    <div class="card-body">
        <h2 class="card-title">Update Pub/Key-pair</h2>
<form method="POST" action={updateAction} use:enhance={() => {
    return async ({ update }) => {
      update({ reset: false });
    };
}}>
    <div class="input">
        <span class="label">Pub:</span>
        <select class="select w-full" name="pubId">
            {#each pubIds as pubIdOption}
                <option value={pubIdOption} selected={pubIdOption === pubId}>{pubIdOption}</option>
            {/each}
        </select>
    </div>
        <div class="input">
            <span class="label">Counter Key:</span>
            <input type="hidden" name="oldPubKey" value={pubKey}/>
            <input type="text" name="pubKey" value={pubKey}/>
            {#if form?.errors?.pubKey}
                <p class="error">{form.errors.pubKey[0]}</p>
            {/if}
        </div>
        {#if form?.errors?.pubId}
            <p class="error">{form.errors.pubId[0]}</p>
        {/if}
    {#if form?.errors?.general}
        <p class="error">{form.errors.general[0]}</p>
    {/if}
    <button class="btn btn-primary" type="submit">Update</button>
</form>
</div>
</div>