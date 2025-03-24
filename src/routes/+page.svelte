<script lang="ts">
    import { source } from "sveltekit-sse";
    
    const value  = source("/events").select("pub_update_count");
</script>

{$value}

