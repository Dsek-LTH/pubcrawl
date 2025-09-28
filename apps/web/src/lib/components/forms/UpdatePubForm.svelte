<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PubsItem } from '$lib/graphql/types';
	import toast from 'svelte-french-toast';

	let {
		updateAction,
		deleteAction,
		pubId,
		pubKey,
		pub
	}: {
		updateAction: string;
		deleteAction: string;
		pubId: PubsItem['pubId'];
		pub: PubsItem;
		pubKey: PubsItem['pubKey'];
	} = $props();

	let logo = $state(pub.logo);

	const handleFileChange = (event: Event) => {
		const target = event.target as HTMLInputElement;
		if (target.files) {
			const file = target.files[0];

			const reader = new FileReader();

			reader.onload = () => {
				logo = reader.result as string;
			};

			if (file) {
				reader.readAsDataURL(file);
			}
		}
	};

	let showConfirmModal = $state(false);

	function confirmDelete() {
		showConfirmModal = true;
	}

	function cancelDelete() {
		showConfirmModal = false;
	}
</script>

<div class="card card-sm bg-base-300 border-l-6" style="border-color:{pub.color};">
	<div class="card-body items-center md:flex-row">
		<form
			class="flex w-full flex-col justify-between gap-1 md:flex-row md:gap-1"
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
			<!-- Id & Display Name -->
			<div class="flex w-full flex-col gap-1">
				<div class="input w-full">
					<span class="label">Id:</span>
					<input type="hidden" name="oldPubId" value={pubId} />
					<input type="text" class="card-title" name="pubId" value={pubId} />
					<!--{#if form?.errors?.pubId}
						<p class="error">{form.errors.pubId[0]}</p>
					{/if}-->
				</div>
				<div class="input w-full">
					<span class="label">Display Name:</span>
					<input name="displayName" value={pub.displayName} />
				</div>
			</div>

			<!-- Occupancy & Capacity -->
			<div class="flex w-full flex-col gap-1">
				<div class="input w-full">
					<span class="label">Occupancy:</span>
					<input type="text" name="occupancy" value={pub.occupancy} />
				</div>
				<div class="input w-full">
					<span class="label">Capacity:</span>
					<input type="text" name="capacity" value={pub.capacity} />
				</div>
			</div>

			<!-- Logo & Color -->
			<div class="flex w-full flex-col gap-1">
				<div>
					<input
						class="file-input w-full"
						type="file"
						accept="image/*"
						onchange={handleFileChange}
					/>
					<input type="hidden" name="logo" value={logo} />
				</div>

				<div class="input w-full">
					<span class="label">Color:</span>
					<input type="color" name="color" value={pub.color} />
				</div>
			</div>
			{#if logo}
				<div class="flex w-full flex-col gap-1">
					<img class="h-[4.5lh] w-auto! rounded-lg bg-white p-1" src={logo} alt="" />
				</div>
			{/if}

			<!-- Active & Open status -->
			<div class="flex w-full flex-col gap-1">
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
					<span class="label">Open:</span>
					<input
						class="checkbox"
						type="checkbox"
						name="isOpen"
						value={pub.isOpen}
						checked={pub.isOpen}
					/>
				</div>
			</div>

			<!-- Queue Status & Buttons -->
			<div class="flex w-full flex-col gap-1">
				<div class="input">
					<span class="label">Queue:</span>
					<select name="queueStatus" class="select min-w-6">
						<option selected={pub.queueStatus == 0} value="0">Short</option>
						<option selected={pub.queueStatus == 1} value="1">Medium</option>
						<option selected={pub.queueStatus == 2} value="2">Long</option>
					</select>
				</div>
				<div class="input">
					<span class="label">Count Key:</span>
					<input type="hidden" name="oldPubKey" value={pubKey} />
					<input type="text" name="pubKey" value={pubKey} />
				</div>
			</div>

			<div class="flex w-fit flex-col gap-1 px-2">
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
