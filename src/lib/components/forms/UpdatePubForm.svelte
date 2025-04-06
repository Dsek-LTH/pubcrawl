<script lang="ts">
    import { enhance } from "$app/forms";
    import { type ActionData } from "./$types";
    import { type Pub, type PubId, type ThemeId} from "$lib/types.ts";

    let { form, updateAction, pubId, pub, themeIds}: {form: ActionData, updateAction: string, pubId: PubId, pub: Pub, themeIds: ThemeId[]} = $props();
</script>

<form method="POST" action={updateAction} use:enhance={() => {
    return async ({ update }) => {
      update({ reset: false });
    };
}}>
    <div>
        <span>Id:</span>
        <input type="hidden" name="oldPubId" value={pubId}/>
        <input type="text" name="pubId" value={pubId}/>
        {#if form?.errors?.pubId}
            <p class="error">{form.errors.pubId[0]}</p>
        {/if}
    </div>
    <div>
        <span>Occupancy:</span>
        <input type="text" name="occupancy" value={pub.occupancy}/>
        {#if form?.errors?.occupancy}
            <p class="error">{form.errors.occupancy[0]}</p>
        {/if}
    </div>
    <div>
        <span>Capacity:</span>
        <input type="text" name="capacity" value={pub.capacity}/>
        {#if form?.errors?.capacity}
            <p class="error">{form.errors.capacity[0]}</p>
        {/if}
    </div>
    <div>
        <span>Active:</span>
        <input type="checkbox" name="isActive" value={pub.isActive} checked={pub.isActive}/>
        {#if form?.errors?.capacity}
            <p class="error">{form.errors.capacity[0]}</p>
        {/if}
    </div>
    <div>
        <span>Theme:</span>
        <select name="themeId">
            {#each themeIds as themeIdOption}
                <option value={themeIdOption} selected={themeIdOption === pub.themeId}>{themeIdOption}</option>
            {/each}
        </select>
        {#if form?.errors?.themeId}
            <p class="error">{form.errors.themeId[0]}</p>
        {/if}
    </div>
    {#if form?.errors?.general}
        <p class="error">{form.errors.general[0]}</p>
    {/if}
    <button type="submit">Update</button>
</form>