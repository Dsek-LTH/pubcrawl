<script>
	import PubcrawlLogo from './PubcrawlLogo.svelte';
</script>

<nav class="navbar dark:bg-base-300 bg-blue-800 text-white shadow-lg">
	<div class="navbar-start">
		<a href="/"><PubcrawlLogo size={54} /></a>
		<a class="btn btn-ghost text-2xl font-bold" href="/">Pubcrawl</a>
	</div>
	<div class="navbar-middle hidden lg:inline-flex">
		<a class="btn btn-ghost" href="/about">About</a>
	</div>
	<div class="navbar-end">
		<a class="btn btn-ghost hidden lg:inline-flex" href="/count">Count</a>
		<div class="dropdown dropdown-end">
			<div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
				<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
					><!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE --><path
						fill="currentColor"
						d="M4 18q-.425 0-.712-.288T3 17t.288-.712T4 16h16q.425 0 .713.288T21 17t-.288.713T20 18zm0-5q-.425 0-.712-.288T3 12t.288-.712T4 11h16q.425 0 .713.288T21 12t-.288.713T20 13zm0-5q-.425 0-.712-.288T3 7t.288-.712T4 6h16q.425 0 .713.288T21 7t-.288.713T20 8z"
					/></svg
				>
			</div>
			<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
			<ul
				tabindex="0"
				class="menu menu-sm dropdown-content rounded-box dark:bg-base-300 z-1 mt-3 w-52 bg-blue-800 p-2 text-white shadow"
			>
				<li><a class="btn btn-outline m-1" href="/about">About</a></li>
				<li><a class="btn btn-outline m-1" href="/count">Count</a></li>
			</ul>
		</div>
	</div>
</nav>
