<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PubsItem } from '$lib/graphql/types';
	import toast from 'svelte-french-toast';

	let { deleteAction, pubIds }: { deleteAction: string; pubIds: PubsItem['pubId'][] } = $props();
</script>

<div class="card bg-base-300 w-full sm:w-6/12">
	<div class="card-body">
		<h2 class="card-title">Delete pub</h2>
		<form
			method="POST"
			class="flex flex-col gap-1"
			action={deleteAction}
			use:enhance={() => {
				return async ({ result }) => {
					if (result.type == 'success') {
						toast.success('Pub successfully deleted!');
					}
				};
			}}
		>
			<div>
				<select class="select w-full" name="pubId">
					<option value="" selected disabled hidden>Select pub</option>
					{#each pubIds as pubIdOption (pubIdOption)}
						<option value={pubIdOption}>{pubIdOption}</option>
					{/each}
				</select>
			</div>
			<button class="btn btn-error" type="submit">Delete</button>
		</form>
	</div>
</div>
