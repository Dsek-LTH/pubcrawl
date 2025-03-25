<script lang="ts">
    import { source } from "sveltekit-sse";
    
    const pubs_store = source("/events").select("pub_update");
</script>

{ $pubs_store }

