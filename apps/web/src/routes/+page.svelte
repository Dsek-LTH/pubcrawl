<script lang="ts">
	import { source } from 'sveltekit-sse';
	import type { PubsItem, ThemesItem } from '$lib/graphql/types';
	import type { Readable } from 'svelte/store';
	import { API_ROUTES, EVENTS } from '$lib/api';

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
	<table class="table md:text-lg">
		<thead>
			<tr>
				<th>Pub</th>
				<th>Occupancy</th>
				<th class="hidden sm:table-cell">Capacity</th>
				<th>Full %</th>
			</tr>
		</thead>
		<tbody>
			{#each activePubs as pub (pub.pubId)}
				<tr>
					<td
						class="border-l-6 font-semibold"
						style="border-color:{$themes.find(({ themeId }) => themeId === pub.themeId)?.color}"
					>
						{$themes.find(({ themeId }) => themeId === pub.themeId)?.displayName || 'Unknown'}
					</td>
					<td>{pub.occupancy}<span class="sm:hidden">/{pub.capacity}</span></td>
					<td class="hidden sm:table-cell">{pub.capacity}</td>
					<td>
						<progress
							class="progress"
							style="color:{$themes.find(({ themeId }) => themeId === pub.themeId)?.color}"
							value={pub.occupancy}
							max={pub.capacity}
						></progress>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
{/if}
