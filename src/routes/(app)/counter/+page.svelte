<script lang="ts">
    import { enhance } from "$app/forms";
    import { source } from "sveltekit-sse";
    
    const pubs_store = source("/events").select("pub_update");
    
    let { data, form } = $props();
    $inspect(form?.pubKey);
</script>

{ $pubs_store }

<form method="POST" use:enhance>
    <button formaction="?/increment">+</button>
    <button formaction="?/decrement">-</button>
</form>

<form method="POST" action="?/verify" use:enhance>
    <input name="pubKey" type="text"/>
    <button>Verify Pub Key</button>
</form>
