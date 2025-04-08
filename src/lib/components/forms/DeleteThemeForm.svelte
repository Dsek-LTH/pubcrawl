<script lang="ts">
    import { enhance } from "$app/forms";
    import { type ActionData } from "./$types"
    import { type ThemeId } from "$lib/types.ts";

    let { form, deleteAction, themeIds }: { form: ActionData, deleteAction: string, themeIds: ThemeId[]} = $props();
</script>

<div class="card w-6/12 bg-base-300">
    <div class="card-body">
        <h2 class="card-title">Delete theme</h2>
        <form method="POST" class="flex flex-col gap-1" action={deleteAction} use:enhance>
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
            <button class="btn btn-primary" type="submit">Delete</button>
        </form>
    </div>
</div>
