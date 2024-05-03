<template>
    <div class="settings-container">
        <div class="card flex flex-column md:flex-row gap-3">
            <div class="settings-div">
                <b class="description">DarkMode</b>
                <InputSwitch v-model="darkmodeChecked" @change="darkmode(darkmodeChecked)" class="margin-right" />
            </div>
            <div class="settings-div">
                <b class="description">Schriftgröße</b>
                <Dropdown v-model="selectedTextSize" :options="textSize" optionLabel="name" class="settings-dropdown" />
            </div>
            <div class="settings-div">Hintergrund ändern
                <Button class="settings-btn"></Button>
            </div>
            <div class="settings-div">Chatbox Farbe
                <ColorPicker v-model="color" class="test" />
            </div>
        </div>
    </div>
</template>

<script setup>
import InputSwitch from 'primevue/inputswitch';
import Dropdown from 'primevue/dropdown';
import ColorPicker from 'primevue/colorpicker';

import { ref } from 'vue';

const darkmodeChecked = ref(false);
const selectedTextSize = ref();
const textSize = ref([
    { name: 'small', code: 's' },
    { name: 'medium', code: 'm' },
    { name: 'large', code: 'l' },
]);
const color = ref();
</script>

<script>
export default {
    methods: {
        darkmode(darkmodeChecked) {
            this.$store.commit('darkmode', darkmodeChecked)
        }
    },
}</script>

<style lang="scss" scoped>
.settings-container {
    margin-left: auto;
    margin-right: auto;
    width: 85%;
    background-color: rgb(255, 255, 255);
}

.settings-div {
    width: 80%;
    margin-left: 10%;
    background-color: blue;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    padding-right: 10px;
}

.description {
    color: black;

}

.settings-btn {
    height: 32px;
    width: 22px;
}

.settings-dropdown {
    height: 32px;
    width: 150px;
}
</style>