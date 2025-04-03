<script lang="ts">
    import { source } from "sveltekit-sse";
    
    const pubs_store = source("/events/pub-update").select("pubsUpdated");
</script>

{ $pubs_store }

