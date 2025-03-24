<script lang="ts">
    import { enhance } from "$app/forms";
    import { source } from "sveltekit-sse";
    
    const pubs_store = source("/events").select("pub_update_count");
</script>

{ $pubs_store }

<form method="POST" use:enhance>
    <input type="text"/>
    <button>Register Counter</button>
</form>
