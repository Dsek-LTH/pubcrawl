<script lang="ts">
	import '../app.css';
</script>

<div class="m-0 flex min-h-screen w-screen flex-col p-0">
	<nav class="navbar bg-base-300">
		<div class="navbar-start">
			<a href="/"
				><img
					class="dark:hidden"
					src="/icons/favicon-512x512.png"
					alt="Pubcrawl logo"
					width="64"
				/></a
			>
			<a href="/"
				><img
					class="hidden dark:block"
					src="/icons/favicon-white-512x512.png"
					alt="Pubcrawl logo"
					width="64"
				/></a
			>
			<a class="btn btn-ghost" href="/">Home</a>
		</div>
		<div class="navbar-middle">
			<a class="btn btn-ghost" href="/about">About</a>
		</div>
		<div class="navbar-end">
			<a class="btn btn-ghost" href="/count">Counter</a>
			<a class="btn btn-ghost" href="/admin">Admin</a>
		</div>
	</nav>

	<main
		class="mx-auto mt-3 flex w-11/12 flex-grow flex-col text-center sm:w-10/12 sm:text-left lg:w-8/12"
	>
		<slot />
	</main>
</div>
