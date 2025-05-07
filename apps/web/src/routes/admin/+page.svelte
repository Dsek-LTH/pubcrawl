<script lang="ts">
	import { enhance } from '$app/forms';
	import { source } from 'sveltekit-sse';
	import { type PageProps } from './$types';

	import CreatePubForm from '$lib/components/forms/CreatePubForm.svelte';
	import CreateThemeForm from '$lib/components/forms/CreateThemeForm.svelte';

	import UpdatePubForm from '$lib/components/forms/UpdatePubForm.svelte';
	import UpdateThemeForm from '$lib/components/forms/UpdateThemeForm.svelte';

	import DeletePubForm from '$lib/components/forms/DeletePubForm.svelte';
	import DeleteThemeForm from '$lib/components/forms/DeleteThemeForm.svelte';
	import { API_ROUTES, EVENTS } from '$lib/api';
	import { type Readable } from 'svelte/store';
	import type { PubKeysSubscriptionSubscription, PubsItem, ThemesItem } from '$lib/graphql/types';
	import toast, { Toaster } from 'svelte-french-toast';

	let { form }: PageProps = $props();

	const pubKeys: Readable<PubKeysSubscriptionSubscription['pubsSubscription']> = source(
		API_ROUTES.EVENTS
	)
		.select(EVENTS.pubKeysUpdated)
		.json();
	const pubs: Readable<PubsItem[]> = source(API_ROUTES.EVENTS).select(EVENTS.pubsUpdated).json();
	const themes: Readable<ThemesItem[]> = source(API_ROUTES.EVENTS)
		.select(EVENTS.themesUpdated)
		.json();

	let pubIds = $derived(($pubs || []).map(({ pubId }) => pubId));
	let themeIds = $derived(($themes || []).map(({ themeId }) => themeId));
	let pubIdKeys = $derived(
		($pubKeys || []).map(({ pubId, pubKey }) => [pubId, pubKey] as [string, string])
	);
	let pairs = $derived(new Map(pubIdKeys));

	$effect(() => {
		if (form) {
			toast.error((Object.values(form.errors as object)[0] as string[])[0]);
		}
	});
</script>

<svelte:head>
	<title>Pubcrawl - Admin</title>
</svelte:head>
<Toaster />

<div class="tabs tabs-border tabs-xl justify-center sm:justify-normal">
	<input type="radio" name="my_tabs_6" class="tab" checked aria-label="Pubs" />
	<div class="tab-content bg-base-100 border-base-300 p-6">
		<p>
			This is where pubs are created. Keep in mind that the name and color of the pubs is determined
			by the theme. Only pubs marked as Active are shown on the front-facing main page.
		</p>
		<br />
		<form
			method="POST"
			use:enhance={() => {
				return async ({ result }) => {
					if (result.type == 'success') {
						toast.success('Randomized pub keys');
					}
				};
			}}
			action="?/randomizePubKeyIdPairPubKeys"
		>
			<button class="btn btn-secondary my-2">Randomize Pub Keys</button>
		</form>
		<div class="flex flex-col items-center gap-4 sm:flex-row sm:items-baseline">
			<CreatePubForm {form} createAction="?/createPub" {themeIds}></CreatePubForm>

			<DeletePubForm {form} deleteAction="?/deletePub" {pubIds}></DeletePubForm>
		</div>
		{#key pairs}
			{#if $pubs && $themes}
				<div class="mt-4 flex flex-col gap-2">
					{#each $pubs as pub (pub.pubId)}
						<UpdatePubForm
							{form}
							updateAction="?/updatePub"
							pubId={pub.pubId}
							pubKey={pairs.get(pub.pubId) ?? ''}
							{pub}
							themes={$themes}
							{themeIds}
						></UpdatePubForm>
						<br />
					{/each}
				</div>
			{/if}
		{/key}
	</div>

	<input type="radio" name="my_tabs_6" class="tab" aria-label="Themes" />
	<div class="tab-content bg-base-100 border-base-300 p-6">
		<p>This is where themes are created. Themes determine the name, color and logo of the pubs.</p>
		<br />
		<div class="flex flex-col items-center gap-4 sm:flex-row sm:items-baseline">
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
	<form method="POST" class="ml-auto self-center" action="?/logout" use:enhance>
		<button class="btn btn-info">Logout</button>
	</form>
</div>
