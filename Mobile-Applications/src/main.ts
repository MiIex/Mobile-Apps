// src/main.ts
import './assets/text.css'
import './assets/main.css'
import { createApp } from 'vue'

import App from './global/App.vue'
import { router } from './router'
import PrimeVue from 'primevue/config';
import Card from 'primevue/card';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import Checkbox from 'primevue/checkbox';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Password from 'primevue/password';
import ConfirmationService from 'primevue/confirmationservice';


import 'primevue/resources/primevue.min.css'; // core css
import 'primeflex/primeflex.css'; // optional for flex layouts
import 'primeicons/primeicons.css'; // icons
import store from './store';


const app = createApp(App)
app.use(router)
app.use(PrimeVue)
app.use(ConfirmationService);
app.use(store)
app.component('Card', Card)
app.component('Button', Button)
app.component('InputGroup', InputGroup)
app.component('InputGroupAddon', InputGroupAddon)
app.component('InputText', InputText)
app.component('Password', Password)
app.component('Checkbox', Checkbox)
app.mount('#app')

const DB_NAME = 'chat-db';
const DB_VERSION = 1; // Use a long long for this value (don't use a float)
const DB_STORE_NAME = 'messages';
const DB_STORE_NAME_2 = 'state'

var db;
openDb()

function openDb() {
    console.log("openDb ...");
    var req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onsuccess = function (evt) {
        // Equal to: db = req.result;
        db = this.result;
        console.log("openDb DONE");
    };
    req.onerror = function (evt) {
        console.error("openDb:", evt.target.errorCode);
    };

    req.onupgradeneeded = function (evt) {
        console.log("openDb.onupgradeneeded");
        var store = evt.currentTarget.result.createObjectStore(
            DB_STORE_NAME, { keyPath: 'id', autoIncrement: true });

        store.createIndex('messageid', 'messageid', { unique: true });
        store.createIndex('userhash', 'userhash', { unique: false });
        store.createIndex('text', 'text', { unique: false });
        store.createIndex('usernickname', 'usernickname', { unique: false });
        store.createIndex('time', 'time', { unique: false });
        store.createIndex('photoid', 'photoid', { unique: false });

        store = evt.currentTarget.result.createObjectStore(
            DB_STORE_NAME_2, { keyPath: 'id', autoIncrement: true });

        store.createIndex('token', 'token', { unique: false });
        store.createIndex('darkmode', 'darkmode', { unique: false });
        store.createIndex('textSize', 'textSize', { unique: false });
        store.createIndex('uploadedBackgroundImage', 'uploadedBackgroundImage', { unique: false });
        store.createIndex('chatColor', 'chatColor', { unique: false });
        store.createIndex('selfChatColor', 'selfChatColor', { unique: false });
        store.createIndex('status', 'status', { unique: false });
        store.createIndex('uploadedProfileImage', 'uploadedProfileImage', { unique: false });
        store.createIndex('userhash', 'userhash', { unique: false });
        store.createIndex('photo', 'photo', { unique: false });
        store.createIndex('clearPhoto', 'clearPhoto', { unique: false });

    };
}

function getObjectStore(store_name, mode) {
    var tx = db.transaction(store_name, mode);
    return tx.objectStore(store_name);
  }

export function addMessagesToDb(messages: any) {
   
    for(let i = 0; i < messages.value.length; i++){

    var obj = {
        messageid: messages.value[i].id,
        userhash: messages.value[i].userhash,
        text: messages.value[i].text,
        usernickname: messages.value[i].usernickname,
        time: messages.value[i].time,
        photoid: messages.value[i].photoid
    }
    var req;
    var store = getObjectStore(DB_STORE_NAME, 'readwrite');

    try{
        req = store.add(obj)
    } catch (e) {
        console.log(e)
    }
}
getMessagesFromDB()
}

export function saveStoreToDb(state: any){



    var obj = {
        token: state.token,
        darkmode: state.darkMode,
        testSize: state.textSize,
        uploadedBackgroundImage: state.uploadedBackgroundImage,
        chatColor: state.chatColor,
        selfChatColor: state.selfChatColor,
        status: state.status,
        uploadedProfileImage: state.uploadedProfileImage,
        userhash: state.userhash,
        photo: state.photo,
        clearPhoto: state.clearPhoto
    }
    var req;
    var store = getObjectStore(DB_STORE_NAME_2, 'readwrite');

    try{
        req = store.add(obj)
    } catch (e) {
        console.log(e)
    }
}

export async function getMessagesFromDB() {
    const request = db.transaction(DB_STORE_NAME).objectStore(DB_STORE_NAME).getAll();
    request.onsuccess = () => {
        const messages = request.result;
        store.commit('saveMessages', messages)
       
        return messages
    }
    
}

