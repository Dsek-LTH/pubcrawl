<svelte:head>
    <title>Pubcrawl</title>
</svelte:head>

<script lang="ts">
    import { source } from "sveltekit-sse";
    
    const pubs_store = source("/events/pub-update").select("pubsUpdated");
    const themes_store = source("/events/theme-update").select("themesUpdated");

    let pubs = $derived(JSON.parse($pubs_store || "{}"))
    let themes = $derived(JSON.parse($themes_store || "{}"))
</script>

{#if pubs && themes}
    <table class="table">
        <thead>
            <tr>
                <th>Pub</th>
                <th>Occupancy</th>
                <th class="hidden sm:table-cell">Capacity</th>
                <th>Full %</th>
            </tr>
        </thead>
        <tbody>
            {#each Object.entries(pubs).filter(([_, pub]) => pub.isActive) as [ pubId, pub ]}

                <tr>
                    <td class="border-l-6" style="border-color:{themes[pub.themeId]?.color}">{themes[pub.themeId]?.displayName || "Unknown"}</td>
                    <td>{pub.occupancy}</td>
                    <td class="hidden sm:table-cell">{pub.capacity}</td>
                    <td><progress class="progress" style="color:{themes[pub.themeId]?.color}" value={pub.occupancy} max={pub.capacity}></progress></td>
                </tr>

            {/each}
        </tbody>
    </table>
{/if}