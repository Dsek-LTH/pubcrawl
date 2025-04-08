<script lang="ts">
    import { enhance } from "$app/forms";
    import { type ActionData } from "./$types"
    import { type PubId } from "$lib/types.ts";

    let { form, deleteAction, pubIds }: { form: ActionData, deleteAction: string, pubIds: PubId[]} = $props();
</script>

<div class="card w-6/12 bg-base-300">
    <div class="card-body">
        <h2 class="card-title">Delete pub</h2>
        <form method="POST" class="flex flex-col gap-1" action={deleteAction} use:enhance>
            <div>
                <select class="select w-full" name="pubId">
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
            <button class="btn btn-primary" type="submit">Delete</button>
        </form>
    </div>
</div>
