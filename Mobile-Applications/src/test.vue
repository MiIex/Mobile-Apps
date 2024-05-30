<template>
    <div :class="textSizeClass">Beispieltext zur Überprüfung der Schriftgröße

        <Panel header="Schriftgröße">
            <Dropdown v-model="selectedTextSize" @change="textsize" :options="textSize" optionLabel="name"
                class="settings-dropdown" />
        </Panel>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useStore } from 'vuex';
import Panel from 'primevue/panel';
import Dropdown from 'primevue/dropdown';

const store = useStore();
const selectedTextSize = ref();

const textSize = ref([
    { name: 'small', code: 's' },
    { name: 'medium', code: 'm' },
    { name: 'large', code: 'l' },
]);

const textSizeClass = ref(store.getters.textSize);

console.log(textSizeClass)

watch(() => store.getters.textSize, (newSize) => {
    textSizeClass.value = newSize;
});

function textsize() {
    if (selectedTextSize.value) {
        store.commit('textsize', selectedTextSize.value.name + '-text');
        console.log('Neue Textgröße:', store.state.textSize);
    } else {
        console.log('selectedTextSize is undefined');
    }
}
</script>

<style scoped></style>
