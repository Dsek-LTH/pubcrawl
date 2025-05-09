<script lang="ts">
	import { enhance } from '$app/forms';
	import { source } from 'sveltekit-sse';
	import { type PageProps } from './$types';

	import PartialPubUpdateForm from '$lib/components/forms/PartialPubUpdateForm.svelte';
	import { API_ROUTES, EVENTS } from '$lib/api';
	import type { PubsItem, ThemesItem } from '$lib/graphql/types';
	import type { Readable } from 'svelte/store';
	import toast, { Toaster } from 'svelte-french-toast';

	let { data, form }: PageProps = $props();

	const pubs: Readable<PubsItem[]> = source(API_ROUTES.EVENTS).select(EVENTS.pubsUpdated).json();
	const themes: Readable<ThemesItem[]> = source(API_ROUTES.EVENTS)
		.select(EVENTS.themesUpdated)
		.json();

	let pub: PubsItem | undefined = $derived(
		($pubs || []).find(({ pubId }) => pubId === data?.pubId)
	);
	let theme: ThemesItem | undefined = $derived(
		($themes || []).find(({ themeId }) => themeId === pub?.themeId)
	);
	$effect(() => {
		if (form) {
			toast.error((Object.values(form.errors as object)[0] as string[])[0]);
		}
	});
</script>

<svelte:head>
	<title>Pubcrawl - Counter</title>
</svelte:head>
<Toaster />
<div class="card bg-base-300">
	<div class="card-body">
		<form method="POST" use:enhance>
			{#if theme}
				<div class="flex flex-row justify-between">
					<h1 class="card-title">
						{theme.displayName} <span class="text-sm">(id: {data?.pubId})</span>
					</h1>

					<details class="dropdown dropdown-end">
						<summary class="btn m-1"
							>Danger zone <svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								class="inline-block h-5 w-5 stroke-current"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M4 6h16M4 12h16M4 18h16"
								></path>
							</svg></summary
						>
						<ul
							class="menu dropdown-content bg-base-100 rounded-box dropdown-right z-1 w-52 p-2 shadow-sm"
						>
							<div class="flex w-full flex-row">
								<input class="input mr-1" name="occupancy" type="text" /><button
									formaction="?/updatePub"
									class="btn btn-primary mb-1">Set occupancy</button
								>
							</div>
							<button class="btn btn-warning my-1 w-full" formaction="?/reset">Reset</button>
							<button class="btn btn-secondary mt-1 w-full" formaction="?/logout">Logout</button>
						</ul>
					</details>
				</div>
			{/if}
		</form>

		<br />

		<form method="POST" use:enhance class="flex flex-col items-center gap-4 sm:flex-row">
			<div class="join join-vertical">
				<button
					class="join-item btn btn-xl btn-success h-40 w-60 text-5xl sm:h-24 sm:w-24"
					formaction="?/increment">+</button
				>
				<button
					class="join-item btn btn-xl btn-error h-40 w-60 text-5xl sm:h-24 sm:w-24"
					formaction="?/decrement">-</button
				>
			</div>
			{#if pub}
				<PartialPubUpdateForm {form} updateAction="?/updatePub" {pub}></PartialPubUpdateForm>
			{/if}
		</form>
		<br />
	</div>
</div>
