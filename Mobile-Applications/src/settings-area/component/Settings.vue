<template>
    <Card :class="textSizeClass">
        <template #content>
            <Panel :class="textSizeClass" header="DarkMode">
                <InputSwitch v-model="darkmodeChecked" @change="darkmode(darkmodeChecked)" class="margin-right" />
            </Panel>
            <Panel :class="textSizeClass" header="Schriftgröße">
                <Dropdown v-model="selectedTextSize" @change="textsize" :options="textSize" optionLabel="name"
                    class="settings-dropdown" />
            </Panel>
            <Panel :class="textSizeClass" header="Hintergrund ändern">
                <FileUpload mode="basic" name="demo[]" accept="image/*" :maxFileSize="1000000" @upload="backgroundImage"
                    :auto="false" chooseLabel="Browse" />
            </Panel>
            <Panel :class="textSizeClass" header="Chatbox Farbe">
                <ColorPicker v-model="color" format="hex" @change="chatboxColor" class="test" />
            </Panel>
        </template>
    </Card>
</template>

<script setup>
import Card from 'primevue/card';
import Panel from 'primevue/panel';
import InputSwitch from 'primevue/inputswitch';
import Dropdown from 'primevue/dropdown';
import ColorPicker from 'primevue/colorpicker';
import FileUpload from 'primevue/fileupload';

import { ref, watch, onMounted } from 'vue';
import { useStore } from 'vuex';
import { usePrimeVue } from 'primevue/config';

const store = useStore();
const PrimeVue = usePrimeVue();

const selectedTextSize = ref();
const darkmodeChecked = ref(localStorage.getItem('darkmode') === 'true'); // Initialize from localStorage
const textSize = ref([
    { name: 'small', code: 's' },
    { name: 'medium', code: 'm' },
    { name: 'large', code: 'l' },
]);
const color = ref();
const textSizeClass = ref(store.getters.textSize);

watch(() => store.getters.textSize, (newSize) => {
    textSizeClass.value = newSize;
});

function darkmode(isDarkMode) {
    const newTheme = isDarkMode ? 'lara-dark-indigo' : 'md-light-deeppurple';
    const oldTheme = isDarkMode ? 'md-light-deeppurple' : 'lara-dark-indigo';
    
    PrimeVue.changeTheme(oldTheme, newTheme, 'theme-link', () => {
        console.log(`Theme changed to ${newTheme}`);
    });

    store.commit('darkmode', isDarkMode);
    localStorage.setItem('darkmode', isDarkMode);
}

function textsize() {
    if (selectedTextSize.value) {
        const newTextSize = selectedTextSize.value.name + '-text';
        store.commit('textsize', newTextSize);
        console.log('Neue Textgröße:', store.state.textSize);
    } else {
        console.log('selectedTextSize is undefined');
    }
}

function backgroundImage(file) {
    store.commit('backgroundImage', file);
    console.log(store.state.uploadedBackgroundImage);
}

function chatboxColor(color) {
    store.commit('changecolor', color);
    console.log(color.value);
    localStorage.setItem('chatColor', color.value); // Speichere den Hex-Wert ohne das '#'
}

onMounted(() => {
    const storedSize = localStorage.getItem('textSize');
    if (storedSize) {
        store.commit('textsize', storedSize);
    }

    // Apply the saved dark mode theme on mount
    darkmode(darkmodeChecked.value);
});
</script>

<style lang="css" scoped>
.settings-dropdown {
    height: 50px;
    width: 150px;
}
</style>
