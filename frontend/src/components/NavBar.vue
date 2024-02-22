<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container">
      <a href="/" class="navbar-brand">Logo</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#myNavbar"
        aria-controls="myNavbar" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="myNavbar">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link" href="/">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/driver">Driver</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/bus">Bus</a>
          </li>
          <li class="nav-item" v-if="user && user.is_staff">
            <a class="nav-link" href="/schedule">Schedule</a>
          </li>


        </ul>
        <DarkModeSwitch>
        </DarkModeSwitch>
        <ul class="navbar-nav">
          <li class="nav-item" v-if="!user">
            <a class="nav-link" href="/login">
              <LogIn /> Log in
            </a>
          </li>
          <li class="nav-item" v-if="!user">
            <a class="nav-link" href="/signup">
              <SignUp />
              Sign up
            </a>
          </li>
          <li class="nav-item" v-if="user">
            <a class="nav-link" href="" @click="LogOut()">
              Log out
            </a>
          </li>
          <li class="nav-item" v-if="user">
            <a class="nav-link" href="/profile">
              <Profile />
              Profile
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
  
<script>
import 'bootstrap/dist/css/bootstrap.min.css';
import DarkModeSwitch from '../components/DarkModeSwitch.vue';
import LogIn from './icons/LogIn.vue';
import SignUp from './icons/SignUp.vue';
import Profile from './icons/Profile.vue';
import { mapActions, mapState } from 'pinia'
import authStore from '@/stores/authStore';
export default {
  name: 'NavBar',
  components: {
    LogIn,
    SignUp,
    Profile,
    DarkModeSwitch
  },
  computed: {

    ...mapState(authStore, ['user'])
  },
  methods: {
    ...mapActions(authStore, ['logout']),
    async LogOut() {
      await this.logout()
      localStorage.removeItem('auth_token');

    },


  },




}
</script>
  
<style scoped></style>