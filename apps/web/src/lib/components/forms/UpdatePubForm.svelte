<script lang="ts">
	import { enhance } from '$app/forms';
	import { type ActionData } from './$types';
	import type { PubsItem, ThemesItem } from '$lib/graphql/types';
	import toast from 'svelte-french-toast';

	let {
		form,
		updateAction,
		pubId,
		pubKey,
		themes,
		pub,
		themeIds
	}: {
		form: ActionData;
		updateAction: string;
		pubId: PubsItem['pubId'];
		pub: PubsItem;
		pubKey: PubsItem['pubKey'];
		themes: ThemesItem[];
		themeIds: ThemesItem['themeId'][];
	} = $props();

	let themeColor = $derived(
		themes?.find((theme) => theme.themeId === pub.themeId)?.color ?? '#999'
	);


	//$effect(() => {console.log(form.errors)})
	
</script>

<div class="card card-sm bg-base-300 border-l-6" style="border-color:{themeColor};">
	<div class="card-body">
		<form
			class="flex flex-col md:flex-row gap-1"
			method="POST"
			action={updateAction}
			use:enhance={() => {
				return async ({ update, result }) => {
					update({ reset: false });
					if (result.type == 'success') {toast.success("Successfully updated Pub")};
				};
			}}
		>
			<div class="flex flex-col">
				<div class="input w-full">
					<span class="label">Id:</span>
					<input type="hidden" name="oldPubId" value={pubId} />
					<input type="text" class="card-title" name="pubId" value={pubId} />
					<!--{#if form?.errors?.pubId}
						<p class="error">{form.errors.pubId[0]}</p>
					{/if}-->
				</div>
				<div class="select w-full">
					<span class="label">Theme</span>
					<select class="w-full" name="themeId">
						{#each themeIds as themeIdOption (themeIdOption)}
							<option value={themeIdOption} selected={themeIdOption === pub.themeId}
								>{themeIdOption}</option
							>
						{/each}
					</select>
				</div>
			</div>

			<div class="flex flex-col">
				<div class="flex flex-col">
					<div class="input w-full sm:w-50">
						<span class="label">Occupancy:</span>
						<input type="text" name="occupancy" value={pub.occupancy} />
					</div>
					<div class="input w-full sm:w-50">
						<span class="label">Capacity:</span>
						<input type="text" name="capacity" value={pub.capacity} />
					</div>
				</div>
			</div>
			<div class="flex flex-col">
				<div class="input">
					<span class="label">Active:</span>
					<input
						class="checkbox"
						type="checkbox"
						name="isActive"
						value={pub.isActive}
						checked={pub.isActive}
					/>
				</div>
				<div class="input">
					<span class="label">Counter Key:</span>
					<input type="hidden" name="oldPubKey" value={pubKey} />
					<input type="text" name="pubKey" value={pubKey} />
				</div>
			</div>
			<button class="btn btn-secondary self-center" type="submit">Save</button>
		</form>
	</div>
</div>
