<script lang="ts">
	import { enhance } from '$app/forms';
	import { type ActionData } from './$types';
	import type { PubsItem, ThemesItem } from '$lib/graphql/types';

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
</script>

<div class="card card-sm bg-base-300 border-l-6" style="border-color:{themeColor};">
	<div class="card-body">
		<form
			class="flex flex-row gap-1"
			method="POST"
			action={updateAction}
			use:enhance={() => {
				return async ({ update }) => {
					update({ reset: false });
				};
			}}
		>
			<div class="flex flex-col">
				<div class="input w-full">
					<span class="label">Id:</span>
					<input type="hidden" name="oldPubId" value={pubId} />
					<input type="text" class="card-title" name="pubId" value={pubId} />
					{#if form?.errors?.pubId}
						<p class="error">{form.errors.pubId[0]}</p>
					{/if}
				</div>
				<div class="select">
					<span class="label">Theme</span>
					<select class="w-full" name="themeId">
						{#each themeIds as themeIdOption (themeIdOption)}
							<option value={themeIdOption} selected={themeIdOption === pub.themeId}
								>{themeIdOption}</option
							>
						{/each}
					</select>
					{#if form?.errors?.themeId}
						<p class="error">{form.errors.themeId[0]}</p>
					{/if}
				</div>
			</div>

			<div class="flex flex-col">
				<div class="flex flex-col">
					<div class="input w-50">
						<span class="label">Occupancy:</span>
						<input type="text" name="occupancy" value={pub.occupancy} />
						{#if form?.errors?.occupancy}
							<p class="error">{form.errors.occupancy[0]}</p>
						{/if}
					</div>
					<div class="input w-50">
						<span class="label">Capacity:</span>
						<input type="text" name="capacity" value={pub.capacity} />
						{#if form?.errors?.capacity}
							<p class="error">{form.errors.capacity[0]}</p>
						{/if}
					</div>
				</div>
			</div>
			{#if form?.errors?.general}
				<p class="error">{form.errors.general[0]}</p>
			{/if}
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
					{#if form?.errors?.capacity}
						<p class="error">{form.errors.capacity[0]}</p>
					{/if}
				</div>
				<div class="input">
					<span class="label">Counter Key:</span>
					<input type="hidden" name="oldPubKey" value={pubKey} />
					<input type="text" name="pubKey" value={pubKey} />
					{#if form?.errors?.pubKey}
						<p class="error">{form.errors.pubKey[0]}</p>
					{/if}
				</div>
			</div>
			<button class="btn btn-secondary" type="submit">Update</button>
		</form>
	</div>
</div>
