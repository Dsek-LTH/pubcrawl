<script lang="ts">
    import { enhance } from "$app/forms";
    import { type ActionData } from "./$types";
    import { type ThemeId } from "$lib/types.ts";

    let { form, createAction, themeIds}: {form: ActionData, createAction: string, themeIds: ThemeId[] } = $props();
</script>

<form method="POST" action={createAction} use:enhance>
    <div>
        <span>Id:</span>
        <input type="text" name="pubId"/>
        {#if form?.errors?.pubId}
            <p class="error">{form.errors.pubId[0]}</p>
        {/if}
    </div>
    <div>
        <span>Occupancy:</span>
        <input type="text" name="occupancy"/>
        {#if form?.errors?.occupancy}
            <p class="error">{form.errors.occupancy[0]}</p>
        {/if}
    </div>
    <div>
        <span>Capacity:</span>
        <input type="text" name="capacity"/>
        {#if form?.errors?.capacity}
            <p class="error">{form.errors.capacity[0]}</p>
        {/if}
    </div>
    <div>
        <span>Theme:</span>
        <select name="themeId">
            <option value="" selected disabled hidden>Select theme</option>
            {#each themeIds as themeIdOption}
                <option value={themeIdOption}>{themeIdOption}</option>
            {/each}
        </select>
        {#if form?.errors?.themeId}
            <p class="error">{form.errors.themeId[0]}</p>
        {/if}
    </div>
    {#if form?.errors?.general}
        <p class="error">{form.errors.general[0]}</p>
    {/if}
    <button type="submit">Create</button>
</form>