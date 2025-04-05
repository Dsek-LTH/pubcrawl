<script lang="ts">
    import { source } from "sveltekit-sse";
    
    const pubs_store = source("/events/pub-update").select("pubsUpdated");
    const themes_store = source("/events/theme-update").select("themesUpdated");

    let pubs = $derived(JSON.parse($pubs_store || "{}"))
    let themes = $derived(JSON.parse($themes_store || "{}"))
</script>

{#if pubs && themes}
    <table>
        <thead>
            <tr>
                <th>Pub</th>
                <th>Occupancy</th>
                <th>Capacity</th>
                <th>Full %</th>
            </tr>
        </thead>
        <tbody>
            {#each Object.entries(pubs).filter(([_, pub]) => pub.isActive) as [ pubId, pub ]}

                <tr>
                    <td>{themes[pub.themeId]?.displayName || "Unknown"}</td>
                    <td>{pub.occupancy}</td>
                    <td>{pub.capacity}</td>
                    <td>{pub.occupancy / pub.capacity * 100}</td>
                </tr>

            {/each}
        </tbody>
    </table>
{/if}