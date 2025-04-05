<script lang="ts">
    import {enhance} from "$app/forms";
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
    </div>
    <div>
        <span>Occupancy:</span>
        <input type="text" name="occupancy" value={pub.occupancy}/>
    </div>
    <div>
        <span>Capacity:</span>
        <input type="text" name="capacity" value={pub.capacity}/>
    </div>
    <div>
        <span>Active:</span>
        <input type="checkbox" name="isActive" value={pub.isActive} checked={pub.isActive}/>
    </div>
    <div>
        <span>Theme:</span>
        <select name="themeId">
            {#each themeIds as themeIdOption}
                <option value={themeIdOption} selected={themeIdOption === pub.themeId}>{themeIdOption}</option>
            {/each}
        </select>
    </div>
    <button type="submit">Update</button>
</form>