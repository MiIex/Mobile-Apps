<template>
    <Card>
        <template #content>
            <Panel header="DarkMode">
                <InputSwitch v-model="darkmodeChecked" @change="darkmode(darkmodeChecked)" class="margin-right" />
            </Panel>
            <Panel header="Schriftgröße">
                <Dropdown v-model="selectedTextSize" @change="textsize" :options="textSize" optionLabel="name"
                    class="settings-dropdown" />
            </Panel>
            <Panel header="Hintergrund ändern">
                <FileUpload mode="basic" name="demo[]" accept="image/*" :maxFileSize="1000000" @upload="backgroundImage"
                    :auto="false" chooseLabel="Browse" />
            </Panel>
            <Panel header="Chatbox Farbe">
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
        },
        textsize(selectedTextSize) {
            this.$store.commit('textsize', selectedTextSize.value.name)
            console.log(this.$store.state.textSize)
        },
        backgroundImage(file) {
            this.$store.commit('backgroundImage', file);
            console.log(this.$store.state.uploadedBackgroundImage)
        },
        chatboxColor(color) {
            this.$store.commit('changecolor', color)
            console.log(this.$store.state.chatColor.value)
        }
    },
}
</script>

<style lang="scss" scoped>
.settings-dropdown {
    height: 50px;
    width: 150px;
}
</style>
