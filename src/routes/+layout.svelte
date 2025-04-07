<script lang="ts">
import "../app.css";
</script>

<header>
    <nav class="navbar bg-base-200">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/counter">Counter</a>
        <a href="/admin">Admin</a>
    </nav>
</header>

<slot />

<footer>
    <div>
        <p>Powered by Dsek</p>
        <a href="https://github.com/Dsek-LTH/pubcrawl">Source Code</a>
    </div>
</footer>

<style>
    :global(img) {
        width: 64px;
    }
</style>
