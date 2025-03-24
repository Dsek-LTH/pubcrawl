<script lang="ts">
    import { source } from "sveltekit-sse";
    
    const pubs_store = source("/events").select("pub_update_count");
</script>

{ $pubs_store }

