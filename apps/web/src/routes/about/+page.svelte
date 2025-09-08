<script>
	import PubcrawlLogo from '$lib/components/PubcrawlLogo.svelte';
</script>

<main class="mb-4 flex flex-col items-center text-center">
	<PubcrawlLogo class="w-6/12 text-center sm:w-4/12" />

	<h1 class="text-2xl font-bold">Pubcrawl</h1>

	<p>
		Pubcrawl is a web app that allows door attendants at TLTH pubs to register participants. The
		information is updated in real-time, allowing visitors to see how many people are at each pub
		during the pub crawl.
	</p>
	<br />
	<p class="mt-10 mb-4">
		Created by the <a class="link" href="https://dsek.se/committees/cpu">CPU</a> Committee, of the
		<a class="link" href="https://dsek.se">D-guild</a>. The source code is publicly available on
		<a class="link" href="https://github.com/Dsek-LTH/pubcrawl">GitHub</a>.
	</p>
	<div class="my-20 w-screen skew-y-10 overflow-hidden bg-[#2e2e2e] p-2 py-8 dark:bg-[#e8e8e8]">
		<a class="" href="https://dsek.se/committees/cpu">
			<img
				class="hidden w-6/12 -skew-y-10 sm:w-2/12 dark:inline"
				src="https://raw.githubusercontent.com/Dsek-LTH/grafik/refs/heads/main/committee_logos/cpu/PNG/full/light.png"
				alt="Pubcrawl logo"
			/>
			<img
				class="inline w-6/12 -skew-y-10 sm:w-2/12 dark:hidden"
				src="https://raw.githubusercontent.com/Dsek-LTH/grafik/refs/heads/main/committee_logos/cpu/PNG/full/dark.png"
				alt="Pubcrawl logo"
			/>
		</a>
	</div>
</main>
