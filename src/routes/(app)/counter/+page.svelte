<script lang="ts">
    import { enhance } from "$app/forms";
    import { source } from "sveltekit-sse";
    import { type PageData } from "./$types";
    import { type PubId, type Pub, type Pubs, type Theme, type Themes } from "$lib/types";

    let { data }: { data: PageData } = $props();

    const pubs_store = source("/events/pub-update").select("pubsUpdated");
    const themes_store = source("/events/theme-update").select("themesUpdated");

    let pubs: Pubs = $derived(JSON.parse($pubs_store || "{}"))
    let themes: Pubs = $derived(JSON.parse($themes_store || "{}"))

    let pub: Pub = $derived(pubs[data?.pubId]);
    let theme: Theme = $derived(themes[pub?.themeId]);
</script>

{#if theme}
    <h1>{theme.displayName}</h1>
{/if}

{#if pub}
    {JSON.stringify(pub)}
{/if}

<form method="POST" use:enhance>
    <button formaction="?/increment">+</button>
    <button formaction="?/decrement">-</button>
    <button formaction="?/reset">reset</button>
</form>

<form method="POST" action="?/logout" use:enhance>
    <button>Logout</button>
</form>
