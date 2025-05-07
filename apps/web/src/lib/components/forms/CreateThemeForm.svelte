<script lang="ts">
	import { enhance } from '$app/forms';
	import { type ActionData } from './$types';

	let { createAction }: { form: ActionData; createAction: string } = $props();

	let logo = $state('');

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

<div class="card bg-base-300 sm:w-6/12 w-full">
	<div class="card-body">
		<h2 class="card-title">Create theme</h2>
		<form method="POST" class="flex flex-col gap-1" action={createAction} use:enhance>
			<div class="input w-full">
				<span class="label">Id:</span>
				<input type="text" name="themeId" />
			</div>
			<div class="w-full">
				<img src={logo} alt="" />
				<input class="file-input w-full" type="file" accept="image/*" onchange={handleFileChange} />
				<input type="hidden" name="logo" value={logo} />
			</div>
			<div class="input w-full">
				<span class="label">Display Name:</span>
				<input name="displayName" />
			</div>
			<div class="input w-full">
				<span class="label">Color:</span>
				<input type="color" name="color" />
			</div>
			<button class="btn btn-success" type="submit">Create</button>
		</form>
	</div>
</div>
