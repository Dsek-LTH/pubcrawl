<script lang="ts">
	import { enhance } from '$app/forms';
	import toast from 'svelte-french-toast';

	let { createAction }: { createAction: string } = $props();

	let logo = $state('');

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
</script>

<div class="card bg-base-300 w-full">
	<div class="card-body">
		<h2 class="card-title">Create pub</h2>
		<form
			class="flex flex-col gap-1"
			method="POST"
			action={createAction}
			use:enhance={() => {
				return async ({ result, update }) => {
					update({ reset: true });
					if (result.type == 'success') {
						toast.success('Pub successfully created!');
					}
				};
			}}
		>
			<div class="input w-full">
				<span class="label">Id:</span>
				<input type="text" name="pubId" />
			</div>
			<div class="input w-full">
				<span class="label">Capacity:</span>
				<input type="text" name="capacity" />
			</div>
			<div class="w-full">
				<img src={logo} alt="" />
				<input class="file-input w-full" type="file" accept="image/*" onchange={handleFileChange} />
				<input type="hidden" name="logo" value={logo} />
			</div>
			<div class="input w-full">
				<span class="label">Display name:</span>
				<input type="text" name="displayName" />
			</div>
			<div class="input w-full">
				<span class="label">Color:</span>
				<input type="color" name="color" />
			</div>
			<button class="btn btn-success w-full" type="submit">Create</button>
		</form>
	</div>
</div>
