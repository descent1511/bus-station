<!-- DarkModeSwitch.vue -->
<template>
    <div class="theme-toggle" @click="toggleTheme">
    <span v-if="userTheme === 'dark-theme'">☀️</span>
    <span v-else>🌙</span>
    </div>
</template>
  
<script>
export default {
    mounted() {
        const initUserTheme = this.getTheme() || this.getMediaPreference();
        this.setTheme(initUserTheme);
    },

    data() {
        return {
            userTheme: "light-theme",
        };
    },
    methods: {
        setTheme(theme) {
            localStorage.setItem("user-theme", theme);
            this.userTheme = theme;
            document.documentElement.className = theme;
        },
        toggleTheme() {
            const activeTheme = localStorage.getItem("user-theme");
            if (activeTheme === "light-theme") {
                this.setTheme("dark-theme");
            } else {
                this.setTheme("light-theme");
            }
        },
        getMediaPreference() {
            const hasDarkPreference = window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches;
            if (hasDarkPreference) {
                return "dark-theme";
            } else {
                return "light-theme";
            }
        },
        getTheme() {
            return localStorage.getItem("user-theme");
        },
    },
};
</script>
  
<style scoped>
/* Add styling for the dark mode switch button as needed */
</style>
  