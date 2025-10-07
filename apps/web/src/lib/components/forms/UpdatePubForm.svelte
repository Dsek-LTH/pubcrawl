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

	let form: HTMLFormElement;
</script>

<div class="card card-sm bg-base-300 border-l-6" style="border-color:{pub.color};">
	<div class="card-body items-center md:flex-row">
		<form
			class="flex w-full flex-col justify-between gap-3 md:flex-row md:gap-1"
			method="POST"
			action={updateAction}
			bind:this={form}
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
			<div class="flex w-full flex-col gap-3">
				<div class="input w-full">
					<span class="own-label">Id</span>
					<input type="hidden" name="oldPubId" value={pubId} />
					<input type="text" class="card-title" name="pubId" value={pubId} />
					<!--{#if form?.errors?.pubId}
						<p class="error">{form.errors.pubId[0]}</p>
					{/if}-->
				</div>
				<div class="input w-full">
					<span class="own-label">Display Name</span>
					<input name="displayName" value={pub.displayName} />
				</div>
			</div>

			<!-- Occupancy & Capacity -->
			<div class="flex w-full flex-col">
				<div class="flex flex-col gap-3">
					<div class="input w-full">
						<span class="own-label">Occupancy</span>
						<input type="text" name="occupancy" value={pub.occupancy} />
					</div>
					<div class="input w-full">
						<span class="own-label">Capacity</span>
						<input type="text" name="capacity" value={pub.capacity} />
					</div>
				</div>
			</div>

			<!-- Logo & Color -->
			<div class="flex w-full flex-col gap-3">
				<div class="">
					<input
						class="file-input w-full"
						type="file"
						accept="image/*"
						onchange={handleFileChange}
					/>
					<input type="hidden" name="logo" value={logo} />
				</div>

				<div class="input w-full gap-3">
					<span class="own-label">Color</span>
					<input type="color" name="color" value={pub.color} />
				</div>
			</div>
			{#if logo}
				<div class="flex w-full flex-col">
					<img class="h-[4.5lh] w-auto! rounded-lg bg-white p-1" src={logo} alt="" />
				</div>
			{/if}

			<!-- Active & Pub Key -->
			<div class="flex w-full flex-col gap-3">
				<div class="input w-full">
					<span class="own-label">Count Key</span>
					<input type="hidden" name="oldPubKey" value={pubKey} />
					<input type="text" name="pubKey" value={pubKey} />
				</div>
				<div class="select w-full">
					<span class="own-label">Queue</span>
					<select name="queueStatus" class="min-w-6">
						<option selected={pub.queueStatus == 0} value="0">Short</option>
						<option selected={pub.queueStatus == 1} value="1">Medium</option>
						<option selected={pub.queueStatus == 2} value="2">Long</option>
					</select>
				</div>
			</div>

			<!-- Queue Status & Buttons -->
			<div class="flex w-full flex-col gap-3 xl:px-7">
				<button class="btn btn-secondary w-full self-center" type="submit">Save</button>
				<button type="button" class="btn btn-error w-full self-center" onclick={confirmDelete}
					>Delete</button
				>
			</div>
			<div class="divider md:divider-horizontal my-0 md:my-1"></div>
			<div class="flex flex-col items-center justify-center text-center xl:px-3">
				<span class="text-base-content/70 p-1 text-base font-medium">Active</span>
				<input
					class="checkbox checkbox-lg checkbox-neutral"
					type="checkbox"
					name="isActive"
					value={pub.isActive}
					checked={pub.isActive}
					onchange={() => form.requestSubmit()}
				/>
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
