<script lang="ts">
    import { enhance } from "$app/forms";
    import { type ActionData } from "./$types";
    import { type Pub } from "$lib/types.ts";

    let { form, updateAction, pub }: {form: ActionData, updateAction: string, pub: Pub } = $props();
</script>

<form method="POST" action={updateAction} use:enhance={() => {
    return async ({ update }) => {
      update({ reset: false });
    };
}}>
    <div>
        <span>Occupancy:</span>
        <input type="text" name="occupancy" value={pub.occupancy}/>
        {#if form?.errors?.occupancy}
            <p class="error">{form.errors.occupancy[0]}</p>
        {/if}
    </div>
    {#if form?.errors?.general}
        <p class="error">{form.errors.general[0]}</p>
    {/if}
    <button type="submit">Update</button>
</form>
