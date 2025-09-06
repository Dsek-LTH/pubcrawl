<script lang="ts">
	import { source } from 'sveltekit-sse';
	import type { PubsItem, ThemesItem } from '$lib/graphql/types';
	import type { Readable } from 'svelte/store';
	import { API_ROUTES, EVENTS } from '$lib/api';
	import PubItem from '$lib/components/PubItem.svelte';

	const pubs: Readable<PubsItem[]> = source(API_ROUTES.EVENTS).select(EVENTS.pubsUpdated).json();
	const themes: Readable<ThemesItem[]> = source(API_ROUTES.EVENTS)
		.select(EVENTS.themesUpdated)
		.json();

	let activePubs = $derived(
		($pubs || [])
			.filter(({ isActive }) => isActive)
			.sort((a, b) => a.occupancy / a.capacity - b.occupancy / b.capacity)
	);
</script>

<svelte:head>
	<title>Pubcrawl</title>
</svelte:head>

{#if $themes?.length + $pubs?.length > 0}
	{#each activePubs as pub (pub.pubId)}
		<PubItem {pub} {themes} />
	{/each}
{/if}
<!--<div
	class="border-l-6 font-semibold"
	style="border-color:{$themes.find(({ themeId }) => themeId === pub.themeId)?.color}"
>
	{$themes.find(({ themeId }) => themeId === pub.themeId)?.displayName || 'Unknown'}
</div>
<div>{pub.occupancy}<span class="sm:hidden">/{pub.capacity}</span></div>
<div class="hidden sm:table-cell">{pub.capacity}</div>
<div>
	<progress
		class="progress"
		style="color:{$themes.find(({ themeId }) => themeId === pub.themeId)?.color}"
		value={pub.occupancy}
		max={pub.capacity}
	></progress>
</div>
-->
