<script lang="ts">
	import { enhance } from '$app/forms';
	import { source } from 'sveltekit-sse';
	import { type PageProps } from './$types';

	import CreatePubForm from '$lib/components/forms/CreatePubForm.svelte';

	import UpdatePubForm from '$lib/components/forms/UpdatePubForm.svelte';

	import { API_ROUTES, EVENTS } from '$lib/api';
	import { type Readable } from 'svelte/store';
	import type { PubKeysSubscriptionSubscription, PubsItem } from '$lib/graphql/types';
	import toast, { Toaster } from 'svelte-french-toast';

	let { form }: PageProps = $props();

	const pubKeys: Readable<PubKeysSubscriptionSubscription['pubsSubscription']> = source(
		API_ROUTES.EVENTS
	)
		.select(EVENTS.pubKeysUpdated)
		.json();
	const pubs: Readable<PubsItem[]> = source(API_ROUTES.EVENTS).select(EVENTS.pubsUpdated).json();

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
		<CreatePubForm createAction="?/createPub"></CreatePubForm>
		{#key pairs}
			{#if $pubs}
				<div class="mt-4 flex flex-col gap-2">
					{#each $pubs as pub (pub.pubId)}
						<UpdatePubForm
							updateAction="?/updatePub"
							deleteAction="?/deletePub"
							pubId={pub.pubId}
							pubKey={pairs.get(pub.pubId) ?? ''}
							{pub}
						></UpdatePubForm>
						<br />
					{/each}
				</div>
			{/if}
		{/key}
	</div>

	<form method="POST" class="ml-auto self-center" action="?/logout" use:enhance>
		<button class="btn btn-info">Logout</button>
	</form>
</div>
