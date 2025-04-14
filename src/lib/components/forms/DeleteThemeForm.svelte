<script lang="ts">
	import { enhance } from '$app/forms';
	import { type ActionData } from './$types';
	import type { ThemesItem } from '$lib/graphql/types';

	let {
		form,
		deleteAction,
		themeIds
	}: { form: ActionData; deleteAction: string; themeIds: ThemesItem['themeId'][] } = $props();
</script>

<div class="card bg-base-300 w-6/12">
	<div class="card-body">
		<h2 class="card-title">Delete theme</h2>
		<form method="POST" class="flex flex-col gap-1" action={deleteAction} use:enhance>
			<div>
				<select class="select w-full" name="themeId">
					<option value="" selected disabled hidden>Select theme</option>
					{#each themeIds as themeIdOption (themeIdOption)}
						<option value={themeIdOption}>{themeIdOption}</option>
					{/each}
				</select>
				{#if form?.errors?.themeId}
					<p class="error">{form.errors.themeId[0]}</p>
				{/if}
			</div>
			{#if form?.errors?.general}
				<p class="error">{form.errors.general[0]}</p>
			{/if}
			<button class="btn btn-error" type="submit">Delete</button>
		</form>
	</div>
</div>
