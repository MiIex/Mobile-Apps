<template>
    <Card :class="textSizeClass" class="container">
        <template #content>
            <Panel :class="textSizeClass" header="DarkMode">
                <InputSwitch v-model="darkmodeChecked" @change="darkmode(darkmodeChecked)" class="margin-right" />
            </Panel>
            <Panel :class="textSizeClass" header="Schriftgröße">
                <Dropdown v-model="selectedTextSize" @change="textsize" :options="textSize" optionLabel="name"
                    class="settings-dropdown" />
            </Panel>
            <Panel :class="textSizeClass" header="Hintergrund ändern">
                <FileUpload mode="basic" name="demo[]" accept="image/*" :maxFileSize="1000000" customUpload
                    @select="backgroundImage" chooseLabel="Browse" />
            </Panel>
            <Panel :class="textSizeClass" header="Chatbox Farbe">
                <ColorPicker v-model="color" format="hex" @change="chatboxColor" class="test" />
            </Panel>
            <Panel :class="textSizeClass" header="eigene Chatbox Farbe">
                <ColorPicker v-model="selfColor" format="hex" @change="selfChatboxColor" class="test" />
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

import { ref, watch, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { usePrimeVue } from 'primevue/config';

const store = useStore();
const PrimeVue = usePrimeVue();

const selectedTextSize = ref();
const darkmodeChecked = ref(localStorage.getItem('darkmode') === 'true');
const textSize = ref([
    { name: 'small', code: 's' },
    { name: 'medium', code: 'm' },
    { name: 'large', code: 'l' },
]);
const color = ref();
const selfColor = ref();
const textSizeClass = ref(store.getters.textSize);
const backgroundImageUrl = ref(localStorage.getItem('backgroundImageUrl') || ''); // Neu: URL des Hintergrundbilds

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

function backgroundImage(event) {
    const file = event.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        backgroundImageUrl.value = e.target.result;
        localStorage.setItem('backgroundImageUrl', backgroundImageUrl.value); // Bild-URL im LocalStorage speichern
        store.commit('backgroundImage', backgroundImageUrl.value);
        console.log('Uploaded Background Image URL:', backgroundImageUrl.value);
    };
    reader.readAsDataURL(file);
}

function chatboxColor(color) {
    store.commit('changecolor', color);
    console.log(color.value);
    localStorage.setItem('chatColor', color.value); // Speichere den Hex-Wert ohne das '#'
}

function selfChatboxColor(color) {
    store.commit('selfChangecolor', color);
    console.log(color.value);
    localStorage.setItem('selfChatColor', color.value); // Speichere den Hex-Wert ohne das '#'
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

.container {}
</style>
