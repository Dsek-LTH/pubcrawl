<script lang="ts">
    import { enhance } from "$app/forms";
    import { type ActionData } from "./$types";
    import { type ThemeId } from "$lib/types.ts";

    let { form, createAction, themeIds}: {form: ActionData, createAction: string, themeIds: ThemeId[] } = $props();
</script>
<div class="card w-6/12 bg-base-300">
    <div class="card-body">
        <h2 class="card-title">Create pub</h2>
        <form class="flex flex-col gap-1" method="POST" action={createAction} use:enhance>
            <div class="input w-full">
                <span class="label">Id:</span>
                <input type="text" name="pubId"/>
                {#if form?.errors?.pubId}
                    <p class="error">{form.errors.pubId[0]}</p>
                {/if}
            </div>
            <div class="input w-full">
                <span class="label">Occupancy:</span>
                <input type="text" name="occupancy"/>
                {#if form?.errors?.occupancy}
                    <p class="error">{form.errors.occupancy[0]}</p>
                {/if}
            </div>
            <div class="input w-full">
                <span class="label">Capacity:</span>
                <input type="text" name="capacity"/>
                {#if form?.errors?.capacity}
                    <p class="error">{form.errors.capacity[0]}</p>
                {/if}
            </div>
            <div>
                <select class="select w-full" name="themeId">
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
            <button class="btn btn-primary w-full" type="submit">Create</button>
        </form>
    </div>
</div>
