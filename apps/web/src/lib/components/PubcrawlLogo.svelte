<script lang="ts">
	import { twMerge } from 'tailwind-merge';

	let { size, class: klass }: { size?: number; class?: string } = $props();
</script>

<img
	class={twMerge('dark:hidden', klass)}
	src="/icons/favicon-512x512.png"
	alt="Pubcrawl logo"
	width={size}
/>
<img
	class={twMerge('hidden dark:block', klass)}
	src="/icons/favicon-white-512x512.png"
	alt="Pubcrawl logo"
	width={size}
/>
