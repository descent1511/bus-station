<template>
    <div class="wrapper">
        <div class="container mt-5">
            <div class="d-flex flex-column align-items-center mb-5">
                <h1 class="pt-3 font-title-2 font-semibold">Log in</h1>
                <div class="d-flex">
                    <span class="me-2"> Not a member yet?</span>
                    <a class="text-viridian text-decoration-none" href="signup.html">Sign up</a>
                </div>
            </div>
            <form @submit.prevent="Login">
                <div class="mb-3">
                    <label for="username">Username: </label>
                    <input v-model="form.username" type="text" class="form-control" id="username"
                        placeholder="Enter your username">
                </div>

                <div class="mb-3">
                    <div class="d-flex justify-content-between">
                        <label for="exampleInputPassword1" class="form-label fw-bold">Password</label>
                        <a class="text-viridian text-decoration-none" href="signup.html">Forgot Password</a>
                    </div>
                    <input v-model="form.password" type="password" class="form-control" id="password"
                        placeholder="Enter your password">
                </div>

                <div class="text-center">
                    <button type="submit" class="btn btn-primary">Login</button>
                </div>

                <!-- or -->
                <div class="d-flex items-center justify-content-between my-2">
                    <div style="width: 45%" class="p-1 login-orline">
                        <hr>
                    </div>
                    <span class="p-1 login-orline">or</span>
                    <div style="width: 45%" class="p-1 login-orline">
                        <hr>
                    </div>
                </div>

                <!-- log in with -->
                <div class="d-flex flex-column">
                    <button class="d-flex login-button2 form-label justify-content-between mb-2" type="button">
                        <FB />
                        <div class="fw-light fs-6">Facebook</div>
                        <div></div>
                    </button>
                    <button class="d-flex login-button3 form-label justify-content-between" type="button">
                        <GG />
                        <div class="fw-light fs-6">Google</div>
                        <div></div>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
  
  
<script>
import 'bootstrap/dist/css/bootstrap.min.css';
import FB from './icons/Facebook.vue';
import GG from './icons/Google.vue';
import { mapActions, mapState } from 'pinia';

import authStore from '@/stores/authStore';
export default {
    name: 'LogInForm',
    components: {
        FB,
        GG
    },
    data() {
        return {
            form: {
                username: '',
                password: ''
            }
        }
    },
    computed: {
        ...mapState(authStore, ['user', 'accessToken'])
    },
    methods: {
        ...mapActions(authStore, ['login']),
        async Login() {
            const router = this.$router;
            console.log(this.form)
            const response = await this.login(this.form)
            const { auth_token } = response.data
            localStorage.auth_token = auth_token
            if (auth_token) {
               
                router.push('/')
            }
            else router.push('/signup')

        }
    }
}

</script>
  
<style scoped></style>