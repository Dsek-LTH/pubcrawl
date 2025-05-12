<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PubsItem, ThemesItem } from '$lib/graphql/types';
	import toast from 'svelte-french-toast';

	let {
		updateAction,
		deleteAction,
		pubId,
		pubKey,
		themes,
		pub,
		themeIds
	}: {
		updateAction: string;
		deleteAction: string;
		pubId: PubsItem['pubId'];
		pub: PubsItem;
		pubKey: PubsItem['pubKey'];
		themes: ThemesItem[];
		themeIds: ThemesItem['themeId'][];
	} = $props();

	let themeColor = $derived(
		themes?.find((theme) => theme.themeId === pub.themeId)?.color ?? '#999'
	);

	let showConfirmModal = $state(false);

	function confirmDelete() {
		showConfirmModal = true;
	}

	function cancelDelete() {
		showConfirmModal = false;
	}
</script>

<div class="card card-sm bg-base-300 border-l-6" style="border-color:{themeColor};">
	<div class="card-body items-center md:flex-row">
		<form
			class="flex w-full flex-col justify-between gap-1 md:flex-row"
			method="POST"
			action={updateAction}
			use:enhance={() => {
				return async ({ update, result }) => {
					update({ reset: false });
					if (result.type == 'success') {
						toast.success('Successfully updated!');
					}
				};
			}}
		>
			<div class="flex w-full flex-col">
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

			<div class="flex w-full flex-col">
				<div class="flex flex-col">
					<div class="input w-full">
						<span class="label">Occupancy:</span>
						<input type="text" name="occupancy" value={pub.occupancy} />
					</div>
					<div class="input w-full">
						<span class="label">Capacity:</span>
						<input type="text" name="capacity" value={pub.capacity} />
					</div>
				</div>
			</div>
			<div class="flex w-full flex-col">
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
			<div class="flex w-full flex-col items-center justify-center gap-2 self-center sm:flex-row">
				<button class="btn btn-secondary self-center not-md:w-full" type="submit">Save</button>
				<button
					type="button"
					class="btn btn-error self-center not-md:w-full"
					onclick={confirmDelete}>Delete</button
				>
			</div>
		</form>

		{#if showConfirmModal}
			<div class="modal modal-open">
				<div class="modal-box">
					<h3 class="text-lg font-bold">Confirm Deletion</h3>
					<p>Are you sure you want to delete this pub?</p>
					<div class="modal-action">
						<form
							method="POST"
							action={deleteAction}
							use:enhance={() => {
								return async ({ result }) => {
									if (result.type == 'success') {
										toast.success('Pub successfully deleted!');
									}
								};
							}}
						>
							<input type="hidden" name="pubId" value={pubId} />
							<button class="btn btn-error" type="submit">Yes</button>
						</form>
						<button class="btn btn-soft" onclick={cancelDelete}>Cancel</button>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>
