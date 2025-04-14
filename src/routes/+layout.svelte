<script lang="ts">
import '../app.css';
</script>

<div class="flex flex-col min-h-screen w-screen m-0 p-0">
    <nav class="navbar bg-base-300">
        <div class="navbar-start">
            <a href="/"><img class="dark:hidden" src="/icons/favicon-512x512.png" alt="Pubcrawl logo" width=64></a>
            <a href="/"><img class="hidden dark:block" src="/icons/favicon-white-512x512.png" alt="Pubcrawl logo" width=64></a>
            <a class="btn btn-ghost" href="/">Home</a>
        </div>
        <div class="navbar-middle">
            <a class="btn btn-ghost" href="/about">About</a>
        </div>
        <div class="navbar-end">
            <a class="btn btn-ghost" href="/counter">Counter</a>
            <a class="btn btn-ghost" href="/admin">Admin</a>
        </div>
    </nav>

    <main class="mx-auto w-11/12 sm:w-10/12 lg:w-8/12 mt-3 text-center sm:text-left flex flex-col flex-grow">
    <slot />
    </main>
</div>

