<script lang="ts">
	import { enhance } from '$app/forms';
	import { type ActionData } from './$types';
	import type { ThemesItem } from '$lib/graphql/types';

	let {
		form,
		updateAction,
		themeId,
		theme
	}: { form: ActionData; updateAction: string; themeId: ThemesItem['themeId']; theme: ThemesItem } =
		$props();

	let logo = $state(theme.logo);

	function handleFileChange(event) {
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
			class="flex flex-col md:flex-row gap-1"
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
					<input type="hidden" name="oldThemeId" value={themeId} />
					<input type="text" class="card-title" name="themeId" value={themeId} />
					{#if form?.errors?.themeId}
						<p class="error">{form.errors.themeId[0]}</p>
					{/if}
				</div>
				<div class="input w-full">
					<span class="label">Display Name:</span>
					<input name="displayName" value={theme.displayName} />
					{#if form?.errors?.displayName}
						<p class="error">{form.errors.displayName[0]}</p>
					{/if}
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
					{#if form?.errors?.logo}
						<p class="error">{form.errors.logo[0]}</p>
					{/if}
				</div>

				<div class="input w-full">
					<span class="label">Color:</span>
					<input type="color" name="color" value={theme.color} />
					{#if form?.errors?.color}
						<p class="error">{form.errors.color[0]}</p>
					{/if}
				</div>
			</div>

			{#if form?.errors?.general}
				<p class="error">{form.errors.general[0]}</p>
			{/if}

			{#if logo}
				<div class="flex flex-col">
					<img class="h-[4.5lh] w-auto! rounded-lg bg-white p-1" src={logo} alt="" />
				</div>
			{/if}
			<button class="btn btn-secondary self-center" type="submit">Save</button>
		</form>
	</div>
</div>
