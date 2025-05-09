<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PubsItem } from '$lib/graphql/types';
	import toast from 'svelte-french-toast';

	let { updateAction, pub }: { updateAction: string; pub: PubsItem } = $props();
</script>

<form
	class="flex items-center"
	method="POST"
	action={updateAction}
	use:enhance={() => {
		return async ({ update, result }) => {
			update({ reset: false });
			if (result.type == 'success') {
				toast.success('Successful');
			}
		};
	}}
>
	<div class="stats min-w-60 bg-white shadow dark:bg-black">
		<div class="stat text-center">
			<span class="stat-title">Occupancy</span>
			<span
				class="stat-value text-5xl font-bold {pub.occupancy > pub.capacity ? 'text-red-500' : ''}"
				>{pub.occupancy} / {pub.capacity}</span
			>
		</div>
	</div>
</form>
