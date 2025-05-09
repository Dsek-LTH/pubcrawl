<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ThemesItem } from '$lib/graphql/types';
	import toast from 'svelte-french-toast';

	let {
		updateAction,
		themeId,
		theme
	}: { updateAction: string; themeId: ThemesItem['themeId']; theme: ThemesItem } = $props();

	let logo = $state(theme.logo);

	function handleFileChange(event: any) {
		const file = event.target.files[0];
		const reader = new FileReader();

		reader.onload = () => {
			logo = reader.result as string;
		};

		if (file) {
			reader.readAsDataURL(file);
		}
	}
</script>

<div class="card card-sm bg-base-300 border-l-6" style="border-color:{theme.color};">
	<div class="card-body">
		<form
			class="flex flex-col gap-1 md:flex-row"
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
			<div class="flex flex-col">
				<div class="input w-full">
					<span class="label">Id:</span>
					<input type="hidden" name="oldThemeId" value={themeId} />
					<input type="text" class="card-title" name="themeId" value={themeId} />
				</div>
				<div class="input w-full">
					<span class="label">Display Name:</span>
					<input name="displayName" value={theme.displayName} />
				</div>
			</div>

			<div class="flex flex-col">
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
					<input type="color" name="color" value={theme.color} />
				</div>
			</div>

			{#if logo}
				<div class="flex flex-col">
					<img class="h-[4.5lh] w-auto! rounded-lg bg-white p-1" src={logo} alt="" />
				</div>
			{/if}
			<button class="btn btn-secondary self-center" type="submit">Save</button>
		</form>
	</div>
</div>
