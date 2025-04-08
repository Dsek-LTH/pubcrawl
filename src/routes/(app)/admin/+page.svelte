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

<form method="POST" action="?/logout" use:enhance>
    <button class="btn btn-primary">Logout</button>
</form>
<div class="tabs tabs-border tabs-xl">
    <input type="radio" name="my_tabs_6" class="tab" aria-label="Pub keys" checked="checked" />
    <div class="tab-content bg-base-100 border-base-300 p-6">
<p>This is where login codes for the pubs are created. These can be randomly genererated or manually typed, and are then used by the door guards to sign into the system. These will need to be distributed manually.</p><br>
        <div class="flex flex-row gap-4">
<CreatePubKeyIdPairForm form={form} createAction="?/createPubKeyIdPair" pubIds={Object.keys(pubs)}>
</CreatePubKeyIdPairForm>
<br>

<DeletePubKeyIdPairForm form={form} deleteAction="?/deletePubKeyIdPair" pubKeys={Object.keys(pubKeyIdPairs)}>
</DeletePubKeyIdPairForm>
<br>
</div>
<h2>Utilities</h2>
<form method="POST" use:enhance action="?/randomizePubKeyIdPairPubKeys">
    <button class="btn btn-primary">Randomize Pub Keys</button>
</form>
{#if pubKeyIdPairs && pubs}
<div class="flex flex-col gap-2 mt-4">
    {#each (Object.entries(pubKeyIdPairs)) as [ pubKey, pubId ]}
        <UpdatePubKeyIdPairForm form={form} updateAction="?/updatePubKeyIdPair" pubs={pubs} themes={themes} pubKey={pubKey} pubId={pubId} pubIds={Object.keys(pubs)}>
        </UpdatePubKeyIdPairForm>
        <br>
    {/each}
    </div>
{/if}

    </div>
  
    <input type="radio" name="my_tabs_6" class="tab" aria-label="Pubs" />
    <div class="tab-content bg-base-100 border-base-300 p-6">

<p>This is where pubs are created. Keep in mind that the name and color of the pubs is determined by the theme. Only pubs marked as Active are shown on the front-facing main page.</p><br>
<div class="flex flex-row gap-4">
<CreatePubForm form={form} createAction="?/createPub" themeIds={Object.keys(themes)}>
</CreatePubForm>


<DeletePubForm form={form} deleteAction="?/deletePub" pubIds={Object.keys(pubs)}>
</DeletePubForm>
</div>
{#if pubs && themes}
<div class="flex flex-col gap-2 mt-4">
    {#each (Object.entries(pubs)) as [ pubId, pub ]}
        <UpdatePubForm form={form} updateAction="?/updatePub" pubId={pubId} pub={pub} themes={themes} themeIds={Object.keys(themes)}>
        </UpdatePubForm>
        <br>
    {/each}
    </div>
{/if}
    </div>
  
    <input type="radio" name="my_tabs_6" class="tab" aria-label="Themes" />
    <div class="tab-content bg-base-100 border-base-300 p-6">
        <p>This is where themes are created. Themes determine the name, color and logo of the pubs.</p><br>
<div class="flex flex-row gap-4">
<CreateThemeForm form={form} createAction="?/createTheme">
</CreateThemeForm>
<br>

<DeleteThemeForm form={form} deleteAction="?/deleteTheme" themeIds={Object.keys(themes)}>
</DeleteThemeForm>
<br>
</div>

{#if themes}
<div class="flex flex-col gap-2 mt-4">
    {#each (Object.entries(themes)) as [ themeId, theme ]}
        <UpdateThemeForm form={form} updateAction="?/updateTheme" themeId={themeId} theme={theme}>
        </UpdateThemeForm>
        <br>
    {/each}
    </div>
{/if}
    </div>
  </div>

