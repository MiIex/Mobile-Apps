import { createStore } from 'vuex';

export const store = createStore({
    state() {
        return {
            token: "tN9g3oY7",
            darkMode: false,
            textSize: localStorage.getItem('textSize') || "medium-text", // Initialisiere aus localStorage
            uploadedBackgroundImage: null,
            chatColor: localStorage.getItem('chatColor') || "", // Initialisiere aus localStorage
            selfChatColor: localStorage.getItem('selfChatColor') || "",
            status: "",
            uploadedProfileImage: null,
            userhash: "",
            photo: "",
            clearPhoto: null
        }
    },
    mutations: {
        logIn(state, token) {
            state.token = token.data.token;
            state.userhash = token.data.hash
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
        }
    },
    getters: {
        textSize: state => state.textSize
    }
});

export default store;
