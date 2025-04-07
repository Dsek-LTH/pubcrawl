<svelte:head>
    <title>Pubcrawl - Counter</title>
</svelte:head>

<script lang="ts">
    import { enhance } from "$app/forms";
    import { source } from "sveltekit-sse";
    import { type PageProps } from "./$types";
    import { type PubId, type Pub, type Pubs, type Theme, type Themes } from "$lib/types";

    import PartialPubUpdateForm from "$lib/components/forms/PartialPubUpdateForm.svelte"

    let { data, form }: PageProps = $props();

    const pubs_store = source("/events/pub-update").select("pubsUpdated");
    const themes_store = source("/events/theme-update").select("themesUpdated");

    let pubs: Pubs = $derived(JSON.parse($pubs_store || "{}"))
    let themes: Pubs = $derived(JSON.parse($themes_store || "{}"))

    let pub: Pub = $derived(pubs[data?.pubId]);
    let theme: Theme = $derived(themes[pub?.themeId]);
</script>

<form method="POST" action="?/logout" use:enhance>
    <button>Logout</button>
</form>

{#if theme}
    <h1>{theme.displayName}</h1>
{/if}

{#if pub}
    <PartialPubUpdateForm form={form} updateAction="?/updatePub" pub={pub}>
    </PartialPubUpdateForm>
{/if}
<br>

<form method="POST" use:enhance>
    <button formaction="?/increment">+</button>
    <button formaction="?/decrement">-</button>
    <button formaction="?/reset">reset</button>
</form>
<br>
