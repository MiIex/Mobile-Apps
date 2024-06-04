<template>
    <ConfirmDialog></ConfirmDialog>
    <div class="settings-container">
        <Card>
            <template #content>
                <div class="card flex flex-column md:flex-row gap-3">
                    <div class="profile-image-container">
                        <img :src="profileImageUrl" class="profile-image" alt="Profile Image">
                    </div>
                    <Button label="Profilbild ändern">
                        <FileUpload mode="basic" name="demo[]" accept="image/*" :maxFileSize="1000000" customUpload
                            @select="profileImage" chooseLabel="Browse" />
                    </Button>
                    <Button label="Status setzen" @click="visible = true"></Button>
                    <Dialog v-model:visible="visible" modal header="Change Status" :style="{ width: '25rem' }">
                        <div class="flex align-items-center gap-3 mb-3">
                            <label for="status" class="font-semibold w-6rem">Status</label>
                            <InputText v-model="status" id="status" class=" flex - auto" autocomplete="off" />
                        </div>
                        <div class="flex justify-content-end gap-2">
                            <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
                            <Button type="button" label="Save" @click="saveStatus"></Button>
                        </div>
                    </Dialog>
                    <Button label="Log Out" @click="confirmLogout()"></Button>
                    <Button label="Deregister" @click="confirmDeregister()"></Button>

                </div>
                <Panel class="status-container" header="Status">
                    <p>{{ storedStatus }}</p>
                </Panel>
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
import FileUpload from 'primevue/fileupload';
import Panel from 'primevue/panel';

const confirm = useConfirm();
const visible = ref(false);
const status = ref("");
const store = useStore();


const profileImageUrl = ref(localStorage.getItem('profileImageUrl') || '');
const storedStatus = ref(localStorage.getItem('status') || '');

const confirmLogout = () => {
    confirm.require({
        message: 'Wollen sie sich ausloggen?',
        header: 'Bestätigung',
        icon: 'pi pi-exclamation-triangle',
        rejectClass: 'p-button-secondary p-button-outlined',
        rejectLabel: 'Abbrechen',
        acceptLabel: 'Bestätigen',
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
    let result = await axios.get("https://www2.hs-esslingen.de/~melcher/map/chat/api/index.php/?request=logout", {
        params: {
            token: store.state.token
        }
    }).catch(function (error) {
        // Handle error
    });
    console.log(store.state.token);
    store.commit('logOut');
};

const confirmDeregister = () => {
    confirm.require({
        message: 'Wollen sie den Account deaktivieren?',
        header: 'Bestätigung',
        icon: 'pi pi-exclamation-triangle',
        rejectClass: 'p-button-secondary p-button-outlined',
        rejectLabel: 'Abbrechen',
        acceptLabel: 'Bestätigen',
        accept: () => {
            deregister();
            router.push("/login");
        },
        reject: () => {
            console.log("reject");
        }
    });
};

const deregister = async () => {
    let result = await axios.get("https://www2.hs-esslingen.de/~melcher/map/chat/api/index.php/?request=deregister", {
        params: {
            token: store.state.token
        }
    }).catch(function (error) {
        // Handle error
    });
    console.log(store.state.token);
    store.commit('logOut');
};

function profileImage(event) {
    const file = event.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        profileImageUrl.value = e.target.result;
        localStorage.setItem('profileImageUrl', profileImageUrl.value);
        store.commit('profileImage', profileImageUrl.value);
        console.log('Uploaded Profile Image URL:', profileImageUrl.value);
    };
    reader.readAsDataURL(file);
}

const saveStatus = () => {
    console.log("Status saved:", status.value);
    localStorage.setItem('status', status.value);
    storedStatus.value = status.value;
    store.commit('changeStatus', status.value);
    console.log(store.state.status);
    visible.value = false;
};
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

.profile-image-container {
    width: 100px;
    height: 100px;
    margin-left: 11vh;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
}

.profile-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.status-container {
    margin-top: 20px;
}
</style>
