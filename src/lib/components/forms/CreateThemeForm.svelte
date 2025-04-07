<script lang="ts">
    import { enhance } from "$app/forms";
    import { type ActionData } from "./$types"

    let { form, createAction }: {form: ActionData, createAction: string } = $props();

    let logo = $state("");

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

<form method="POST" action={createAction} use:enhance>
    <div>
        <span>Id:</span>
        <input type="text" name="themeId"/>
        {#if form?.errors?.themeId}
            <p class="error">{form.errors.themeId[0]}</p>
        {/if}
    </div>
    <div>
        <img src={logo} alt="">
        <input type="file" accept="image/*" onchange={handleFileChange} />
        <input type="hidden" name="logo" value={logo} />
        {#if form?.errors?.logo}
            <p class="error">{form.errors.logo[0]}</p>
        {/if}
    </div>
    <div>
        <span>Display Name:</span>
        <input name="displayName"/>
        {#if form?.errors?.displayName}
            <p class="error">{form.errors.displayName[0]}</p>
        {/if}
    </div>
    <div>
        <span>Color:</span>
        <input type="color" name="color"/>
        {#if form?.errors?.color}
            <p class="error">{form.errors.color[0]}</p>
        {/if}
    </div>
    {#if form?.errors?.general}
        <p class="error">{form.errors.general[0]}</p>
    {/if}
    <button type="submit">Create</button>
</form>