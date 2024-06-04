import { createStore } from 'vuex';

export const store = createStore({
    state() {
        return {
            token: "Jo98Xfd7",
            darkMode: false,
            textSize: localStorage.getItem('textSize') || "medium-text", // Initialisiere aus localStorage
            uploadedBackgroundImage: null,
            chatColor: localStorage.getItem('chatColor') || "", // Initialisiere aus localStorage
            chatBackgroundColor: localStorage.getItem('chatBackgroundColor') || "#ffffff", // Initialisiere aus localStorage
            status: "",
            uploadedProfileImage: null,
        }
    },
    mutations: {
        logIn(state, token) {
            state.token = token.data.token;
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
        changeBackgroundColor(state, color) {
            state.chatBackgroundColor = color;
            localStorage.setItem('chatBackgroundColor', color);
        },
        changeStatus(state, status) {
            state.status = status;
        },
        logOut(state) {
            state.token = "";
        }
    },
    getters: {
        textSize: state => state.textSize
    }
});

export default store;
