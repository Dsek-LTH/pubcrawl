<script lang="ts">
	import { source } from 'sveltekit-sse';
	import type { Pubs, Themes } from '$lib/types';

	const pubs_store = source('/events/pub-update').select('pubsUpdated');
	const themes_store = source('/events/theme-update').select('themesUpdated');

	let pubs: Pubs = $derived(JSON.parse($pubs_store || '{}'));
	let themes: Themes = $derived(JSON.parse($themes_store || '{}'));
</script>

<svelte:head>
	<title>Pubcrawl</title>
</svelte:head>

{#if pubs && themes}
	<table class="table">
		<thead>
			<tr>
				<th>Pub</th>
				<th>Occupancy</th>
				<th class="hidden sm:table-cell">Capacity</th>
				<th>Full %</th>
			</tr>
		</thead>
		<tbody>
			{#each pubs
				.values()
				.filter((pub) => pub.isActive)
				.toArray() as pub (pub.themeId)}
				<tr>
					<td class="border-l-6" style="border-color:{themes.get(pub.themeId)?.color}"
						>{themes.get(pub.themeId)?.displayName || 'Unknown'}</td
					>
					<td>{pub.occupancy}</td>
					<td class="hidden sm:table-cell">{pub.capacity}</td>
					<td
						><progress
							class="progress"
							style="color:{themes.get(pub.themeId)?.color}"
							value={pub.occupancy}
							max={pub.capacity}
						></progress></td
					>
				</tr>
			{/each}
		</tbody>
	</table>
{/if}
