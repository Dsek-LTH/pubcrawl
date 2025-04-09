<script lang="ts">
	import { enhance } from '$app/forms';
	import { source } from 'sveltekit-sse';
	import { type PageProps } from './$types';
	import { type Pub, type Pubs, type Theme } from '$lib/types';

	import PartialPubUpdateForm from '$lib/components/forms/PartialPubUpdateForm.svelte';

	let { data, form }: PageProps = $props();

	const pubs_store = source('/events/pub-update').select('pubsUpdated');
	const themes_store = source('/events/theme-update').select('themesUpdated');

	let pubs: Pubs = $derived(JSON.parse($pubs_store || '{}'));
	let themes: Pubs = $derived(JSON.parse($themes_store || '{}'));

	let pub: Pub = $derived(pubs[data?.pubId]);
	let theme: Theme = $derived(themes[pub?.themeId]);
</script>

<svelte:head>
	<title>Pubcrawl - Counter</title>
</svelte:head>

<div class="card bg-base-300">
	<div class="card-body">
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
						<form method="POST" use:enhance>
							<button class="btn btn-warning mb-1 w-full" formaction="?/reset">Reset</button>
							<button class="btn btn-primary mt-1 w-full" formaction="?/logout">Logout</button>
						</form>
					</ul>
				</details>
			</div>
		{/if}

		<br />

		<form
			method="POST"
			use:enhance
			class="flex flex-col items-center gap-4 sm:flex-row sm:items-start"
		>
			<div class="join join-vertical">
				<button
					class="join-item btn btn-xl btn-success h-24 w-60 text-5xl sm:w-24"
					formaction="?/increment">+</button
				>
				<button
					class="join-item btn btn-xl btn-error h-24 w-60 text-5xl sm:w-24"
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
