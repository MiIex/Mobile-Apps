<template>
    <div class="bar">
        <RouterLink to="/profilesettings" tag="button">
            <Button label="Profile" />
        </RouterLink>
        <RouterLink to="/chat" tag="button">
            <Button label="Chat" />
        </RouterLink>
        <RouterLink to="/settings" tag="button">
            <Button label="Settings" />
        </RouterLink>
    </div>
</template>

<style scoped>
Button {
    width: 33%
}
</style>
