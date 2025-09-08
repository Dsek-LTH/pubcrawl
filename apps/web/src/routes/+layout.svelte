<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import '../app.css';
</script>

<div class="m-0 flex min-h-screen w-screen flex-col p-0">
	<Navbar />

	<main
		class="mx-auto mt-3 flex w-11/12 flex-grow flex-col text-center sm:w-10/12 sm:text-left lg:w-8/12"
	>
		<slot />
	</main>
</div>
