<script lang="ts">
    import { enhance } from "$app/forms";
    import { type Theme, type ThemeId } from "$lib/types.ts";

    let { updateAction, themeId, theme }: {updateAction: string, themeId: ThemeId, theme: Theme} = $props();

    let logo = $state(theme.logo);

    function handleFileChange(event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            logo = reader.result as string;
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    }
</script>

<form method="POST" action={updateAction} use:enhance={() => {
    return async ({ update }) => {
      update({ reset: false });
    };
  }}>
    <div>
        <span>Id:</span>
        <input type="hidden" name="oldThemeId" value={themeId}/>
        <input type="text" name="themeId" value={themeId}/>
    </div>
    <div>
        <img src={logo} alt="">
        <input type="file" accept="image/*" onchange={handleFileChange} />
        <input type="hidden" name="logo" value={logo} />
    </div>
    <div>
        <span>Display Name:</span>
        <input name="displayName" value={theme.displayName}/>
    </div>
    <div>
        <span>Color:</span>
        <input type="color" name="color" value={theme.color}/>
    </div>
    <button type="submit">Update</button>
</form>