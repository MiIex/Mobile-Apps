<template>
    <ConfirmDialog></ConfirmDialog>
    <div class="settings-container">
    <div class="card flex flex-column md:flex-row gap-3">
        <Button  label="Profilbild ändern"></Button>
        <Button  label="Nickname ändern"></Button>
        <Button  label="Status setzen"></Button>
        <Button  label="Log Out" @click="confirmLogout()"></Button>
        
    </div>
  </div>
</template>

<script setup>

import { useConfirm } from "primevue/useconfirm";
import ConfirmDialog from 'primevue/confirmdialog';


const confirm = useConfirm();

const confirmLogout = () => {
    confirm.require({
        message: 'Wollen sie sich ausloggen?',
        header: 'Bestätigung',
        icon: 'pi pi-exclamation-triangle',
        rejectClass: 'p-button-secondary p-button-outlined',
        rejectLabel: 'Abbrechen',
        acceptLabel: 'Save',
        accept: () => {
            console.log("accept")
        },
        reject: () => {
            console.log("reject")
        }
    });

}
</script>

<style lang="scss" scoped>
.settings-container {
  margin-left: auto;
  margin-right: auto;
  width: 85%;
  background-color: rgb(255, 255, 255);
}

.settings-div{
    width: 80%;
    margin-left: 10%;
    background-color: blue;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    padding-right: 10px;
}

.description{
    color: black;
   
}
.settings-btn{
    height: 32px;
    width: 22px;
}

.settings-dropdown{
    height: 32px;
    width: 150px;
}

</style>