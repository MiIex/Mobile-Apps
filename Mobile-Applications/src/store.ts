import { createStore } from 'vuex';
import { saveStoreToDb } from './main';

export const store = createStore({
    state() {
        return {
            token: "",
            darkMode: false,
            textSize: localStorage.getItem('textSize') || "medium-text", // Initialisiere aus localStorage
            uploadedBackgroundImage: null,
            chatColor: localStorage.getItem('chatColor') || "", // Initialisiere aus localStorage
            selfChatColor: localStorage.getItem('selfChatColor') || "",
            status: "",
            uploadedProfileImage: null,
            userhash: "",
            photo: "",
            clearPhoto: null,
            messages: []
        }
    },
    mutations: {
        logIn(state, token) {
            state.token = token.data.token;
            state.userhash = token.data.hash;
            saveStoreToDb(state)
        },
        darkmode(state, toggle) {
            state.darkMode = toggle;
        },
        textsize(state, size) {
            state.textSize = size;
            localStorage.setItem('textSize', size);
        },
        backgroundImage(state, image) {
            state.uploadedBackgroundImage = image;
        },
        profileImage(state, image) {
            state.uploadedProfileImage = image;
        },
        changecolor(state, color) {
            state.chatColor = color;
            localStorage.setItem('chatColor', color);
        },
        selfChangecolor(state, color) {
            state.selfChatColor = color;
            localStorage.setItem('selfChatColor', color);
        },
        changeStatus(state, status) {
            state.status = status;
        },
        logOut(state) {
            state.token = "";
            state.userhash = "";
        },
        photo(state, image) {
            state.photo = image;
            localStorage.setItem('photo', image);
        },
        clearPhoto(state) {
            state.photo = null;
            localStorage.removeItem('photo');
        },
        saveMessages(state, messages) {
            state.messages = messages
        }
    },
    getters: {
        messages: state => state.messages,
        textSize: state => state.textSize
    }
});

export default store;
