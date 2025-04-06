<script lang="ts">
    import { enhance } from "$app/forms";
    import { type ActionData } from "./$types"
    import { type ThemeId } from "$lib/types.ts";

    let { form, deleteAction, themeIds }: { form: ActionData, updateAction: string, themeIds: ThemeId[]} = $props();
</script>

<form method="POST" action={deleteAction} use:enhance>
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
    <button type="submit">Delete</button>
</form>