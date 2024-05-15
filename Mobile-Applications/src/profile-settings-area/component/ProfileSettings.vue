<template>
    <ConfirmDialog></ConfirmDialog>
    <div class="settings-container">
        <div class="card flex flex-column md:flex-row gap-3">
            <Button label="Profilbild ändern"></Button>
            <Button label="Nickname ändern"></Button>
            <Button label="Status setzen" @click="visible = true"></Button>
            <Dialog v-model:visible="visible" modal header="Change Status" :style="{ width: '25rem' }">
                <div class="flex align-items-center gap-3 mb-3">
                    <label for="status" class="font-semibold w-6rem">Status</label>
                    <InputText v-model="status" id="status" class="flex-auto" autocomplete="off" />
                </div>
                <div class="flex justify-content-end gap-2">
                    <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
                    <Button type="button" label="Save" @click="saveStatus"></Button>
                </div>
            </Dialog>
            <Button label="Log Out" @click="confirmLogout()"></Button>
        </div>
    </div>
</template>

<script setup>
import { useConfirm } from "primevue/useconfirm";
import ConfirmDialog from 'primevue/confirmdialog';
import Dialog from 'primevue/dialog';
import { ref } from "vue";
import { useStore } from 'vuex';
import { router } from '../../router.ts'
import axios from "axios";

const confirm = useConfirm();
const visible = ref(false);
const status = ref("");
const store = useStore();

const confirmLogout = () => {
    confirm.require({
        message: 'Wollen sie sich ausloggen?',
        header: 'Bestätigung',
        icon: 'pi pi-exclamation-triangle',
        rejectClass: 'p-button-secondary p-button-outlined',
        rejectLabel: 'Abbrechen',
        acceptLabel: 'Save',
        accept: () => {
            
            
            logout()
            router.push("/login")
        },
        reject: () => {
            console.log("reject")
        }
    });
}

const logout = async () => {
    let result = await axios.get("https://www2.hs-esslingen.de/~melcher/map/chat/api/?request=logout", {
        params: {
            token: store.state.token
        }
    }).catch(function (error) {

    })
    console.log(store.state.token)
    store.commit('logOut')
}

const saveStatus = () => {
    console.log("Status saved:", status.value);
    store.commit('changeStatus', status.value)
    console.log(store.state.status)
    visible.value = false;
}
</script>

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