<script lang="ts">
	import { enhance } from '$app/forms';
	import { type ActionData } from './$types';
	import type { PubsItem } from '$lib/graphql/types';
	import toast from 'svelte-french-toast';

	let { form, updateAction, pub }: { form: ActionData; updateAction: string; pub: PubsItem } =
		$props();
</script>

<form
	class="flex items-center"
	method="POST"
	action={updateAction}
	use:enhance={() => {
		return async ({ update, result }) => {
			update({ reset: false });
			if (result.type == 'success') {toast.success("Successful")};
		};
	}}
>
	<div class="stats min-w-60 bg-white shadow dark:bg-black">
		<div class="stat text-center">
			<span class="stat-title">Occupancy</span>
			<span class="stat-value text-5xl font-bold">{pub.occupancy} / {pub.capacity}</span>
			{#if form?.errors?.occupancy}
				<p class="error">{form.errors.occupancy[0]}</p>
			{/if}
		</div>
	</div>
	{#if form?.errors?.general}
		<p class="error">{form.errors.general[0]}</p>
	{/if}
	<!--<button class=" btn btn-sm" type="submit">Refetch</button>-->
</form>