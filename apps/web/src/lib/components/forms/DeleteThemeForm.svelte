<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ThemesItem } from '$lib/graphql/types';
	import toast from 'svelte-french-toast';

	let { deleteAction, themeIds }: { deleteAction: string; themeIds: ThemesItem['themeId'][] } =
		$props();
</script>

<div class="card bg-base-300 w-full sm:w-6/12">
	<div class="card-body">
		<h2 class="card-title">Delete theme</h2>
		<form method="POST" class="flex flex-col gap-1" action={deleteAction} use:enhance={() => {
			return async ({ result }) => {
				if (result.type == 'success') {
					toast.success('Theme successfully deleted!');
				}
			};
		}}>
			<div>
				<select class="select w-full" name="themeId">
					<option value="" selected disabled hidden>Select theme</option>
					{#each themeIds as themeIdOption (themeIdOption)}
						<option value={themeIdOption}>{themeIdOption}</option>
					{/each}
				</select>
			</div>
			<button class="btn btn-error" type="submit">Delete</button>
		</form>
	</div>
</div>
