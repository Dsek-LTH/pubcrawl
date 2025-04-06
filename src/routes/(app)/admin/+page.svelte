<svelte:head>
    <title>Pubcrawl - Admin</title>
</svelte:head>

<script lang="ts">
    import { enhance } from "$app/forms";
    import { source } from "sveltekit-sse";
    import { type Pubs } from "$lib/types";
    import { type PageProps } from "./$types"

    import CreatePubKeyIdPairForm from "$lib/components/forms/CreatePubKeyIdPairForm.svelte"
    import CreatePubForm from "$lib/components/forms/CreatePubForm.svelte"
    import CreateThemeForm from "$lib/components/forms/CreateThemeForm.svelte"

    import UpdatePubKeyIdPairForm from "$lib/components/forms/UpdatePubKeyIdPairForm.svelte"
    import UpdatePubForm from "$lib/components/forms/UpdatePubForm.svelte"
    import UpdateThemeForm from "$lib/components/forms/UpdateThemeForm.svelte"

    import DeletePubKeyIdPairForm from "$lib/components/forms/DeletePubKeyIdPairForm.svelte"
    import DeletePubForm from "$lib/components/forms/DeletePubForm.svelte"
    import DeleteThemeForm from "$lib/components/forms/DeleteThemeForm.svelte"

    let { data, form }: PageProps = $props();

    const pub_key_id_pairs_store = source("/events/pub-key-id-pair-update").select("pubKeyIdPairsUpdated");
    const pubs_store = source("/events/pub-update").select("pubsUpdated");
    const themes_store = source("/events/theme-update").select("themesUpdated");

    const pubKeyIdPairs: Pubs = $derived(JSON.parse($pub_key_id_pairs_store || "{}"))
    const pubs: Pubs = $derived(JSON.parse($pubs_store || "{}"))
    const themes: Pubs = $derived(JSON.parse($themes_store || "{}"))
</script>

<h1>Keys</h1>

<h2>Update</h2>
{#if pubKeyIdPairs && pubs}
    {#each (Object.entries(pubKeyIdPairs)) as [ pubKey, pubId ]}
        <UpdatePubKeyIdPairForm form={form} updateAction="?/updatePubKeyIdPair" pubKey={pubKey} pubId={pubId} pubIds={Object.keys(pubs)}>
        </UpdatePubKeyIdPairForm>
        <br>
    {/each}
{/if}

<h2>Create</h2>
<CreatePubKeyIdPairForm form={form} createAction="?/createPubKeyIdPair" pubIds={Object.keys(pubs)}>
</CreatePubKeyIdPairForm>
<br>

<h2>Delete</h2>
<DeletePubKeyIdPairForm form={form} deleteAction="?/deletePubKeyIdPair" pubKeys={Object.keys(pubKeyIdPairs)}>
</DeletePubKeyIdPairForm>
<br>

<form method="POST" use:enhance action="?/randomizePubKeyIdPairPubKeys">
    <button>Randomize Pub Keys</button>
</form>

<h1>Pubs</h1>

<h2>Update</h2>
{#if pubs && themes}
    {#each (Object.entries(pubs)) as [ pubId, pub ]}
        <UpdatePubForm form={form} updateAction="?/updatePub" pubId={pubId} pub={pub} themeIds={Object.keys(themes)}>
        </UpdatePubForm>
        <br>
    {/each}
{/if}

<h2>Create</h2>
<CreatePubForm form={form} createAction="?/createPub" themeIds={Object.keys(themes)}>
</CreatePubForm>
<br>

<h2>Delete</h2>
<DeletePubForm form={form} deleteAction="?/deletePub" pubIds={Object.keys(pubs)}>
</DeletePubForm>
<br>

<h1>Themes</h1>

<h2>Update</h2>
{#if themes}
    {#each (Object.entries(themes)) as [ themeId, theme ]}
        <UpdateThemeForm form={form} updateAction="?/updateTheme" themeId={themeId} theme={theme}>
        </UpdateThemeForm>
        <br>
    {/each}
{/if}

<h2>Create</h2>
<CreateThemeForm form={form} createAction="?/createTheme"}>
</CreateThemeForm>
<br>

<h2>Delete</h2>
<DeleteThemeForm form={form} deleteAction="?/deleteTheme" themeIds={Object.keys(themes)}>
</DeleteThemeForm>
<br>

<form method="POST" action="?/logout" use:enhance>
    <button>Logout</button>
</form>
