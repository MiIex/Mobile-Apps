<template>
    <ConfirmDialog></ConfirmDialog>
    <div :class="[textSizeClass, 'settings-container']">
        <Card>
            <template #content>
                <div :class="textSizeClass" class="card flex flex-column md:flex-row gap-3">
                    <Button :class="textSizeClass" label="Profilbild ändern"></Button>
                    <Button :class="textSizeClass" label="Nickname ändern"></Button>
                    <Button :class="textSizeClass" label="Status setzen" @click="visible = true"></Button>
                    <Dialog v-model:visible="visible" modal header="Change Status" :style="{ width: '25rem' }">
                        <div :class="textSizeClass" class="flex align-items-center gap-3 mb-3">
                            <label for="status" class="font-semibold w-6rem">Status</label>
                            <InputText v-model="status" id="status" :class="textSizeClass, flex - auto"
                                autocomplete="off" />
                        </div>
                        <div class="flex justify-content-end gap-2">
                            <Button type="button" :class="textSizeClass" label="Cancel" severity="secondary"
                                @click="visible = false"></Button>
                            <Button type="button" :class="textSizeClass" label="Save" @click="saveStatus"></Button>
                        </div>
                    </Dialog>
                    <Button :class="textSizeClass" label="Log Out" @click="confirmLogout()"></Button>
                </div>
            </template>
        </Card>
    </div>
</template>

<script setup>
import { useConfirm } from "primevue/useconfirm";
import ConfirmDialog from 'primevue/confirmdialog';
import Dialog from 'primevue/dialog';
import { ref, watch, onMounted } from "vue";
import { useStore } from 'vuex';
import { router } from '../../router.ts';
import axios from "axios";

const confirm = useConfirm();
const visible = ref(false);
const status = ref("");
const store = useStore();

const textSizeClass = ref(store.getters.textSize);

watch(() => store.getters.textSize, (newSize) => {
    textSizeClass.value = newSize;
});

const confirmLogout = () => {
    confirm.require({
        message: 'Wollen sie sich ausloggen?',
        header: 'Bestätigung',
        icon: 'pi pi-exclamation-triangle',
        rejectClass: 'p-button-secondary p-button-outlined',
        rejectLabel: 'Abbrechen',
        acceptLabel: 'Save',
        accept: () => {
            logout();
            router.push("/login");
        },
        reject: () => {
            console.log("reject");
        }
    });
};

const logout = async () => {
    let result = await axios.get("https://www2.hs-esslingen.de/~melcher/map/chat/api/?request=logout", {
        params: {
            token: store.state.token
        }
    }).catch(function (error) {
        // Handle error
    });
    console.log(store.state.token);
    store.commit('logOut');
};

const saveStatus = () => {
    console.log("Status saved:", status.value);
    store.commit('changeStatus', status.value);
    console.log(store.state.status);
    visible.value = false;
};

onMounted(() => {
    const storedSize = localStorage.getItem('textSize');
    if (storedSize) {
        store.commit('textsize', storedSize);
    }
});
</script>

<style lang="scss" scoped>
.settings-container {
    margin-left: auto;
    margin-right: auto;
    width: 85%;
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
