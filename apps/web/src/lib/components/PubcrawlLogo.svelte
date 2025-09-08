<script lang="ts">
	import { twMerge } from 'tailwind-merge';

	let {
		size,
		class: klass,
		forceDark = false,
		forceLight = false
	}: { size?: number; class?: string; forceDark?: boolean; forceLight?: boolean } = $props();

	let dark = $state('dark:block');
	let light = $state('block');

	if (forceDark) {
		light = 'hidden!';
		dark = 'block';
	}
	if (forceLight) {
		dark = 'hidden!';
		light = 'dark:block';
	}
</script>

<img
	class={twMerge('dark:hidden', klass, light)}
	src="/icons/favicon-512x512.png"
	alt="Pubcrawl logo"
	width={size}
/>
<img
	class={twMerge('hidden', klass, dark)}
	src="/icons/favicon-white-512x512.png"
	alt="Pubcrawl logo"
	width={size}
/>
