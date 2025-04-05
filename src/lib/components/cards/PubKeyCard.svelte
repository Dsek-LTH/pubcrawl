<script lang="ts">
    import {enhance} from "$app/forms";
    import {type ActionData} from "./$types"
    import {type PubId, type PubKey } from "$lib/types.ts";

    let { form, updateAction, pubKey, pubId, pubIds }: {form: ActionData, updateAction: string, pubKey: PubKey, pubId: PubId, pubIds: PubId[]} = $props();
</script>

<form method="POST" action={updateAction} use:enhance={() => {
    return async ({ update }) => {
      update({ reset: false });
    };
  }}>
    <div>
        <span>Counter Key:</span>
        <input type="hidden" name="oldPubKey" value={pubKey}/>
        <input type="text" name="pubKey" value={pubKey}/>
    </div>
    <div>
        <span>Pub:</span>
        <select name="queueStatus">
            {#each pubIds as pubIdOption}
                <option value={pubIdOption} selected={pubIdOption === pubId}>{pubIdOption}</option>
            {/each}
        </select>
    </div>
    <button type="submit">Update</button>
</form>