<script lang="ts">
    import { enhance } from "$app/forms";
    import { type ActionData } from "./$types";
    import { type Pub, type PubId, type ThemeId, type Theme} from "$lib/types.ts";

    let { form, updateAction, pubId, themes, pub, themeIds}: {form: ActionData, updateAction: string, pubId: PubId, pub: Pub, themes: Theme, themeIds: ThemeId[]} = $props();
    let themeColor = "#000000";
    if (pub != undefined && pub.themeId != undefined && themes != undefined && themes[pub.themeId] != undefined) {
        themeColor = themes[pub.themeId].color;
    }
</script>

<div class="card card-sm bg-base-300 border-l-6" style="border-color:{themeColor};">
    <div class="card-body">
        <form class="flex flex-row gap-1" method="POST" action={updateAction} use:enhance={() => {
            return async ({ update }) => {
              update({ reset: false });
            };
        }}>
            <div class="flex flex-col">
                <div class="input w-full">
                    <span class="label">Id:</span>
                    <input type="hidden" name="oldPubId" value={pubId}/>
                    <input type="text" class="card-title" name="pubId" value={pubId}/>
                    {#if form?.errors?.pubId}
                        <p class="error">{form.errors.pubId[0]}</p>
                    {/if}
                </div>
                <div class="select">
                    <span class="label">Theme</span>
                    <select class="w-full" name="themeId">
                        {#each themeIds as themeIdOption}
                            <option value={themeIdOption} selected={themeIdOption === pub.themeId}>{themeIdOption}</option>
                        {/each}
                    </select>
                    {#if form?.errors?.themeId}
                        <p class="error">{form.errors.themeId[0]}</p>
                    {/if}
                </div>
            </div>

            <div class="flex flex-col">
                <div class="flex flex-col">
                <div class="input w-50">
                    <span class="label">Occupancy:</span>
                    <input type="text" name="occupancy" value={pub.occupancy}/>
                    {#if form?.errors?.occupancy}
                        <p class="error">{form.errors.occupancy[0]}</p>
                    {/if}
                </div>
                <div class="input w-50">
                    <span class="label">Capacity:</span>
                    <input type="text" name="capacity" value={pub.capacity}/>
                    {#if form?.errors?.capacity}
                        <p class="error">{form.errors.capacity[0]}</p>
                    {/if}
                </div>
                </div>
                    
                </div>
                {#if form?.errors?.general}
                    <p class="error">{form.errors.general[0]}</p>
                {/if}
                <div class="flex flex-col">
                <div class="input">
                    <span class="label">Active:</span>
                    <input class="checkbox" type="checkbox" name="isActive" value={pub.isActive} checked={pub.isActive}/>
                    {#if form?.errors?.capacity}
                        <p class="error">{form.errors.capacity[0]}</p>
                    {/if}
                </div>


                <button class="btn btn-primary" type="submit">Update</button>
            </div>
        </form>
    </div>
</div>
