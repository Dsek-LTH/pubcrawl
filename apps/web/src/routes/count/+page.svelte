<script lang="ts">
	import { enhance } from '$app/forms';
	import { source } from 'sveltekit-sse';
	import { type PageProps } from './$types';

	import { API_ROUTES, EVENTS } from '$lib/api';
	import type { PubsItem } from '$lib/graphql/types';
	import type { Readable } from 'svelte/store';
	import toast, { Toaster } from 'svelte-french-toast';
	import { twMerge } from 'tailwind-merge';

	let { data, form }: PageProps = $props();

	const pubs: Readable<PubsItem[]> = source(API_ROUTES.EVENTS).select(EVENTS.pubsUpdated).json();

	let pub: PubsItem | undefined = $derived(
		($pubs || []).find(({ pubId }) => pubId === data?.pubId)
	);
	$effect(() => {
		if (form) {
			toast.error((Object.values(form.errors as object)[0] as string[])[0]);
		}
	});

	let incrementElement: HTMLButtonElement | undefined = $state();
	let decrementElement: HTMLButtonElement | undefined = $state();

	let submitQueueStatus: HTMLButtonElement;
	let submitOpenStatus: HTMLButtonElement;
	let inputStatus: HTMLInputElement | undefined = $state();

	function onKeyDown(key: { key: string }) {
		switch (key.key) {
			case 'ArrowUp':
				incrementElement?.click();
				break;
			case 'ArrowDown':
				decrementElement?.click();
		}
	}

	let pubColor = $derived(pub?.color ?? '#999');
	let queueStatus = $derived(pub?.queueStatus);
	const statusNames = ['Short', 'Medium', 'Long'];
	const statusClasses = ['bg-success', 'bg-warning', 'bg-error'];

	$effect(() => {
		if (pub?.queueStatus != queueStatus) {
			submitQueueStatus.click();
		}
	});
</script>

<svelte:head>
	<title>Pubcrawl - Count</title>
</svelte:head>
<svelte:window on:keydown={onKeyDown} />
<Toaster />
<div class="card bg-base-300 border-t-6 sm:h-128" style="border-color:{pubColor};">
	<div class="card-body">
		<form method="POST" use:enhance>
			{#if pub}
				<div class="flex flex-row justify-between">
					<h1 class="card-title">
						<span class="text-xl font-bold">{pub.displayName}</span>
						<span class="text-sm">(id: {data?.pubId})</span>
					</h1>

					<details class="dropdown dropdown-end">
						<summary class="btn m-1"
							>Danger zone <svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								class="inline-block h-5 w-5 stroke-current"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M4 6h16M4 12h16M4 18h16"
								></path>
							</svg></summary
						>
						<ul
							class="menu dropdown-content bg-base-100 rounded-box dropdown-right z-1 w-52 p-2 shadow-sm"
						>
							<div class="flex w-full flex-row">
								<input class="input mr-1" name="occupancy" type="text" /><button
									formaction="?/updatePub"
									class="btn btn-primary mb-1">Set occupancy</button
								>
							</div>
							<button class="btn btn-warning my-1 w-full" formaction="?/reset">Reset to 0</button>
							<button class="btn btn-secondary mt-1 w-full" formaction="?/logout">Logout</button>
						</ul>
					</details>
				</div>
			{/if}
		</form>
		<div class="flex flex-col items-center sm:gap-2">
			<form
				method="POST"
				use:enhance={() => {
					return async ({ update }) => {
						update({ reset: false });
					};
				}}
				class="flex min-h-80 flex-col gap-4 sm:h-full xl:flex-row"
			>
				{#if pub}
					<div class="join join-vertical sm:h-full">
						<button
							bind:this={incrementElement}
							class="join-item btn btn-xl btn-success h-40 w-60 text-5xl sm:h-1/2 sm:w-128 sm:text-6xl"
							formaction="?/increment">+</button
						>
						<button
							bind:this={decrementElement}
							class="join-item btn btn-xl btn-error h-40 w-60 text-5xl sm:h-1/2 sm:w-128 sm:text-6xl"
							formaction="?/decrement">-</button
						>
					</div>

					<div class="stats h-full w-full bg-white shadow dark:bg-black">
						<div class="stat text-center">
							<span class="stat-title sm:text-xl">Occupancy</span>
							<span
								class="stat-value text-5xl font-bold sm:text-8xl {0 > pub.occupancy ||
								pub.occupancy > pub.capacity
									? 'text-red-500'
									: ''}">{pub.occupancy} / {pub.capacity}</span
							>
						</div>
					</div>
				{/if}
			</form>
			<div class="flex w-full flex-col gap-6 sm:flex-row sm:justify-center">
				<form
					method="POST"
					action="?/setQueueStatus"
					use:enhance={() => {
						return async ({ result }) => {
							if (result.type == 'success') {
								toast.success('Queue Status updated');
							}
						};
					}}
				>
					{#snippet tab(n: number)}
						<input
							type="button"
							value={statusNames[n]}
							class={twMerge(
								'tab text-base-content! btn',
								queueStatus == n ? statusClasses[n] : ''
							)}
							onclick={() => {
								inputStatus!.value = '' + n;
								submitQueueStatus.click();
							}}
						/>
					{/snippet}
					<div class="join join-vertical">
						<span class="text-md join-item m-2 font-bold">Queue Status</span>
						<div class="tabs tabs-box join-item">
							{#each [0, 1, 2] as n (n)}
								{@render tab(n)}
							{/each}
						</div>

						<input
							hidden
							type="number"
							name="queueStatus"
							bind:this={inputStatus}
							value={queueStatus}
						/>
						<button hidden formaction="?/setQueueStatus" bind:this={submitQueueStatus} type="submit"
							>button</button
						>
					</div>
				</form>
				<form
					method="POST"
					action="?/setOpen"
					use:enhance={() => {
						return async ({ result }) => {
							if (result.type == 'success') {
								toast.success(`Pub is now ${pub?.isOpen ? 'open' : 'closed'}!`);
							}
						};
					}}
				>
					<div class="flex flex-col">
						<span class="text-md m-2 font-bold">Pub Open</span>
						<div class="flex justify-center">
							<input
								type="checkbox"
								class="checkbox checkbox-{pub?.isOpen ? 'success' : 'error'}"
								name="isOpen"
								checked={pub?.isOpen}
								onchange={() => {
									submitOpenStatus.click();
								}}
							/>
						</div>
					</div>
					<button hidden formaction="?/setOpen" bind:this={submitOpenStatus} type="submit"
						>button</button
					>
				</form>
			</div>
		</div>
	</div>
</div>
