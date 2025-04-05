<script lang="ts">
    import { enhance } from "$app/forms";
    import { source } from "sveltekit-sse";
    import { type Pubs } from "$lib/types";
    import { type PageProps } from "./$types"
    import PubKeyCard from "$lib/components/cards/PubKeyCard.svelte"
    import PubCard from "$lib/components/cards/PubCard.svelte"
    import ThemeCard from "$lib/components/cards/ThemeCard.svelte"

    let { data, form }: PageProps = $props();

    const pub_keys_store = source("/events/pub-key-update").select("pubKeysUpdated");
    const pubs_store = source("/events/pub-update").select("pubsUpdated");
    const themes_store = source("/events/theme-update").select("themesUpdated");

    const pubKeys: Pubs = $derived(JSON.parse($pub_keys_store || "{}"))
    const pubs: Pubs = $derived(JSON.parse($pubs_store || "{}"))
    const themes: Pubs = $derived(JSON.parse($themes_store || "{}"))
</script>

<h1>Keys</h1>

{#if pubKeys && pubs}
    {#each (Object.entries(pubKeys)) as [ pubKey, pubId ]}
        <PubKeyCard updateAction="?/updatePubKey" pubKey={pubKey} pubId={pubId} pubIds={Object.keys(pubs)}>
        </PubKeyCard>
        <br>
    {/each}
{/if}

<form method="POST" use:enhance action="?/randomizePubKeys">
    <button>Randomize Pub Keys</button>
</form>

<h1>Pubs</h1>

{#if pubs && themes}
    {#each (Object.entries(pubs)) as [ pubId, pub ]}
        <PubCard updateAction="?/updatePub" pubId={pubId} pub={pub} themeIds={Object.keys(themes)}>
        </PubCard>
        <br>
    {/each}
{/if}

<h1>Themes</h1>

{#if themes}
    {#each (Object.entries(themes)) as [ themeId, theme ]}
        <ThemeCard updateAction="?/updateTheme" themeId={themeId} theme={theme}>
        </ThemeCard>
        <br>
    {/each}
{/if}

<form method="POST" use:enhance action="?/addPub">
    <input type="text" name="pubKey">
    <input type="text" name="pubId">
    <input type="text" name="themeId">
    <button>Add Pub</button>
</form>

<form method="POST" use:enhance action="?/updatePubKey">
    <input type="text" name="oldPubKey">
    <input type="text" name="newPubKey">
    <button>Update Pub Key</button>
</form>

<form method="POST" use:enhance action="?/addTheme">
    <input type="text" name="themeId">
    <input type="text" name="displayName">
    <button>Add Theme</button>
</form>

<form method="POST" use:enhance action="?/deleteTheme">
    <input type="text" name="themeId">
    <button>Delete Theme</button>
</form>
