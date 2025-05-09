<script>
	import { page } from '$app/state';
</script>

<div class="card mt-4 text-center">
	<h1 class="text-5xl font-bold">{page.status}</h1>
	<span class="text-lg">{page.error?.message}</span>
</div>
