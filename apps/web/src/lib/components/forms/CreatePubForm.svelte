<script lang="ts">
	import { enhance } from '$app/forms';
	import { type ActionData } from './$types';
	import type { ThemesItem } from '$lib/graphql/types';
	import toast from 'svelte-french-toast';

	let {
		createAction,
		themeIds
	}: { form: ActionData; createAction: string; themeIds: ThemesItem['themeId'][] } = $props();
</script>

<div class="card bg-base-300 sm:w-6/12 w-full">
	<div class="card-body">
		<h2 class="card-title">Create pub</h2>
		<form class="flex flex-col gap-1" method="POST" action={createAction} use:enhance={() => {
			return async ({ result, update}) => {
				update({ reset: true });
				if (result.type == 'success') {toast.success("Pub Successfully Created")};
			};
		}}>
			<div class="input w-full">
				<span class="label">Id:</span>
				<input type="text" name="pubId" />
			</div>
			<div class="input w-full">
				<span class="label">Capacity:</span>
				<input type="text" name="capacity" />
			</div>
			<div>
				<select class="select w-full" name="themeId">
					<option value="" selected disabled hidden>Select theme</option>
					{#each themeIds as themeIdOption (themeIdOption)}
						<option value={themeIdOption}>{themeIdOption}</option>
					{/each}
				</select>
			</div>
			<button class="btn btn-success w-full" type="submit">Create</button>
		</form>
	</div>
</div>
