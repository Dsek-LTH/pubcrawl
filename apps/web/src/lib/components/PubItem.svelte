<script lang="ts">
	import type { PubsItem } from '$lib/graphql/types';
	import { twMerge } from 'tailwind-merge';

	let { pub }: { pub: PubsItem } = $props();

	function hexToRgb(hex: string | undefined) {
		var result = hex ? /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex) : null;
		return result
			? {
					r: parseInt(result[1], 16),
					g: parseInt(result[2], 16),
					b: parseInt(result[3], 16)
				}
			: null;
	}
	const bg = pub.color;
	const brightness = hexToRgb(bg)
		? Math.round((hexToRgb(bg)!.r * 299 + hexToRgb(bg)!.g * 587 + hexToRgb(bg)!.b * 114) / 1000)
		: 0;
	const darkFactor = 0.9;
	const darkBg = `rgb(${hexToRgb(bg)!.r * darkFactor}, ${hexToRgb(bg)!.g * darkFactor}, ${hexToRgb(bg)!.b * darkFactor})`;
	const textColor = brightness > 125 ? 'text-black' : 'text-white';
	const statusStrings = ['Short', 'Medium', 'Long'];
	const statusClasses = ['bg-success', 'bg-warning', 'bg-error'];
</script>

<div
	class={twMerge(
		'card bg-base-300 dark:bg-opacity-100 bg-opacity-80 m-1 border-l-6 shadow backdrop-blur-2xl',
		textColor
	)}
	style="border-color: {darkBg}; background-color: {bg}"
>
	<div class="card-body">
		<div class="card-header flex flex-row justify-between">
			<div class="flex flex-row items-center gap-2">
				<h2 class={twMerge('card-title text-xl', textColor)}>
					{pub.displayName}
				</h2>
				{#if !pub.isOpen}
					<div class="badge badge-error">
						<svg class="size-[1em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
							><g fill="currentColor"
								><rect
									x="1.972"
									y="11"
									width="20.056"
									height="2"
									transform="translate(-4.971 12) rotate(-45)"
									fill="currentColor"
									stroke-width="0"
								></rect><path
									d="m12,23c-6.065,0-11-4.935-11-11S5.935,1,12,1s11,4.935,11,11-4.935,11-11,11Zm0-20C7.038,3,3,7.037,3,12s4.038,9,9,9,9-4.037,9-9S16.962,3,12,3Z"
									stroke-width="0"
									fill="currentColor"
								></path></g
							></svg
						>
						Closed
					</div>
				{/if}
			</div>
			<div class="flex flex-col">
				<span class="text-2xl font-bold">{pub.occupancy}/{pub.capacity}</span>
			</div>
		</div>
		<div class="flex flex-row items-center gap-2">
			<!--<img
						class="aspect-square h-16 w-16 rounded-lg bg-white p-1"
						src={$themes.find(({ themeId }) => themeId === pub.themeId)?.logo}
						alt=""
					/>-->
			<div class="flex flex-row items-center">
				<span class="text-nowrap whitespace-pre">Queue: {statusStrings[pub.queueStatus]}</span>
				<span
					class={twMerge(
						'status-shadow m-1 rounded-4xl p-1 shadow-lg',
						statusClasses[pub.queueStatus]
					)}
				></span>
			</div>
			<progress
				class={twMerge('progress h-3 flex-grow-1', textColor)}
				value={pub.occupancy}
				max={pub.capacity}
			></progress>
		</div>
		<!--<svg
			class="self-center"
			xmlns="http://www.w3.org/2000/svg"
			width="32"
			height="32"
			viewBox="6 0 16 16"
			><path
				fill="currentColor"
				d="M11.475 14.475L7.85 10.85q-.075-.075-.112-.162T7.7 10.5q0-.2.138-.35T8.2 10h7.6q.225 0 .363.15t.137.35q0 .05-.15.35l-3.625 3.625q-.125.125-.25.175T12 14.7t-.275-.05t-.25-.175"
			/></svg
		>--><!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE -->
	</div>
</div>
