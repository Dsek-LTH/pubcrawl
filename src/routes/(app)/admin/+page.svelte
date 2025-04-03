<script lang="ts">
    import { enhance } from "$app/forms";
    import { source } from "sveltekit-sse";
    
    const pubs_store = source("/events/pub-update").select("pubsUpdated");
    const pub_keys_store = source("/events/pub-key-update").select("pubKeysUpdated");
    const themes_store = source("/events/theme-update").select("themesUpdated");
</script>

{ $pubs_store }
<br>
<br>
{ $pub_keys_store }
<br>
<br>
{ $themes_store }

<form method="POST" use:enhance action="?/addTheme">
    <input type="text" name="themeId">
    <input type="text" name="displayName">
    <button>Add Theme</button>
</form>

<form method="POST" use:enhance action="?/addPub">
    <input type="text" name="pubKey">
    <input type="text" name="pubId">
    <input type="text" name="themeId">
    <button>Add Pub</button>
</form>
