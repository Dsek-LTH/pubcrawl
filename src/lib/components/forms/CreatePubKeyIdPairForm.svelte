<script lang="ts">
    import { enhance } from "$app/forms";
    import { type ActionData } from "./$types"
    import { type PubId } from "$lib/types.ts";

    let { form, createAction, pubIds }: {form: ActionData, createAction: string, pubIds: PubId[]} = $props();
</script>

<div class="card w-6/12 bg-base-300">
    <div class="card-body">
        <h2 class="card-title">Create Pub/Key-pair</h2>
        <form class="flex flex-col gap-1" method="POST" action={createAction} use:enhance>
            <div class="input w-full">
                <span class="label">Counter Key:</span>
                <input type="text" name="pubKey"/>
                {#if form?.errors?.pubKey}
                    <p class="error">{form.errors.pubKey[0]}</p>
                {/if}
            </div>
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
            <button class="btn btn-primary" type="submit">Create</button>
        </form>
    </div>
</div>
