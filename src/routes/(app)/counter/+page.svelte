<script lang="ts">
    import { enhance } from "$app/forms";
    import { source } from "sveltekit-sse";
    
    const pubs_store = source("/events/pub-update").select("pubsUpdated");

    let { data, form } = $props();
    $inspect(form?.pubKey);
    
    let theme = $state(null);
    
    function handleVerificationResponse({ type, data }) {
        console.log(type + "hehe");
        if (type === "success") {
            theme = { ...data.theme };
        } else if (type === "error") {
            theme = null;
        }
    }

</script>

{ $pubs_store }

<p>Theme: { theme }</p>

<form method="POST" use:enhance>
    <button formaction="?/increment">+</button>
    <button formaction="?/decrement">-</button>
</form>

<form method="POST" action="?/verify" use:enhance={ handleVerificationResponse }>
    <input name="pubKey" type="text"/>
    <button>Verify Pub Key</button>
</form>
