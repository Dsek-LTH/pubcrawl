<script lang="ts">
	import { enhance } from '$app/forms';
	import { source } from 'sveltekit-sse';
	import { type PageProps } from './$types';

	import CreatePubKeyIdPairForm from '$lib/components/forms/CreatePubKeyIdPairForm.svelte';
	import CreatePubForm from '$lib/components/forms/CreatePubForm.svelte';
	import CreateThemeForm from '$lib/components/forms/CreateThemeForm.svelte';

	import UpdatePubKeyIdPairForm from '$lib/components/forms/UpdatePubKeyIdPairForm.svelte';
	import UpdatePubForm from '$lib/components/forms/UpdatePubForm.svelte';
	import UpdateThemeForm from '$lib/components/forms/UpdateThemeForm.svelte';

	import DeletePubKeyIdPairForm from '$lib/components/forms/DeletePubKeyIdPairForm.svelte';
	import DeletePubForm from '$lib/components/forms/DeletePubForm.svelte';
	import DeleteThemeForm from '$lib/components/forms/DeleteThemeForm.svelte';
	import { API_ROUTES, EVENTS } from '$lib/api';
	import type { Readable } from 'svelte/store';
	import type { PubKeysItem, PubsItem, ThemesItem } from '$lib/graphql/types';

	let { form }: PageProps = $props();

	const pubKeys: Readable<PubKeysItem[]> = source(API_ROUTES.EVENTS)
		.select(EVENTS.pubKeysUpdated)
		.json();
	const pubs: Readable<PubsItem[]> = source(API_ROUTES.EVENTS).select(EVENTS.pubsUpdated).json();
	const themes: Readable<ThemesItem[]> = source(API_ROUTES.EVENTS)
		.select(EVENTS.themesUpdated)
		.json();

	let pubIds = $derived(($pubs || []).map(({ pubId }) => pubId));
	let themeIds = $derived(($themes || []).map(({ themeId }) => themeId));
</script>

<svelte:head>
	<title>Pubcrawl - Admin</title>
</svelte:head>

<form method="POST" action="?/logout" use:enhance>
	<button class="btn btn-info">Logout</button>
</form>
<div class="tabs tabs-border tabs-xl">
	<input type="radio" name="my_tabs_6" class="tab" aria-label="Pub keys" checked />
	<div class="tab-content bg-base-100 border-base-300 p-6">
		<p>
			This is where login codes for the pubs are created. These can be randomly genererated or
			manually typed, and are then used by the door guards to sign into the system. These will need
			to be distributed manually.
		</p>
		<br />
		<div class="flex flex-row gap-4">
			<CreatePubKeyIdPairForm {form} createAction="?/createPubKeyIdPair" {pubIds}
			></CreatePubKeyIdPairForm>
			<br />

			<DeletePubKeyIdPairForm
				{form}
				deleteAction="?/deletePubKeyIdPair"
				pubKeys={($pubKeys || []).map(({ key }) => key)}
			></DeletePubKeyIdPairForm>
			<br />
		</div>
		<form method="POST" use:enhance action="?/randomizePubKeyIdPairPubKeys">
			<button class="btn btn-info mt-2">Randomize Pub Keys</button>
		</form>
		{#if $pubKeys && $pubs}
			<div class="mt-4 flex flex-col gap-2">
				{#each $pubKeys as { key, pubId } (key)}
					<UpdatePubKeyIdPairForm
						{form}
						updateAction="?/updatePubKeyIdPair"
						pubs={$pubs}
						themes={$themes}
						pubKey={key}
						{pubId}
						{pubIds}
					></UpdatePubKeyIdPairForm>
					<br />
				{/each}
			</div>
		{/if}
	</div>

	<input type="radio" name="my_tabs_6" class="tab" aria-label="Pubs" />
	<div class="tab-content bg-base-100 border-base-300 p-6">
		<p>
			This is where pubs are created. Keep in mind that the name and color of the pubs is determined
			by the theme. Only pubs marked as Active are shown on the front-facing main page.
		</p>
		<br />
		<div class="flex flex-row gap-4">
			<CreatePubForm {form} createAction="?/createPub" {themeIds}></CreatePubForm>

			<DeletePubForm {form} deleteAction="?/deletePub" {pubIds}></DeletePubForm>
		</div>
		{#if $pubs && $themes}
			<div class="mt-4 flex flex-col gap-2">
				{#each $pubs as pub (pub.pubId)}
					<UpdatePubForm
						{form}
						updateAction="?/updatePub"
						pubId={pub.pubId}
						{pub}
						themes={$themes}
						{themeIds}
					></UpdatePubForm>
					<br />
				{/each}
			</div>
		{/if}
	</div>

	<input type="radio" name="my_tabs_6" class="tab" aria-label="Themes" />
	<div class="tab-content bg-base-100 border-base-300 p-6">
		<p>This is where themes are created. Themes determine the name, color and logo of the pubs.</p>
		<br />
		<div class="flex flex-row gap-4">
			<CreateThemeForm {form} createAction="?/createTheme"></CreateThemeForm>
			<br />

			<DeleteThemeForm {form} deleteAction="?/deleteTheme" {themeIds}></DeleteThemeForm>
			<br />
		</div>

		{#if $themes}
			<div class="mt-4 flex flex-col gap-2">
				{#each $themes as theme (theme.themeId)}
					<UpdateThemeForm {form} updateAction="?/updateTheme" themeId={theme.themeId} {theme}
					></UpdateThemeForm>
					<br />
				{/each}
			</div>
		{/if}
	</div>
</div>
