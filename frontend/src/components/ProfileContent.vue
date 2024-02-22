<template>
    <div class="container-fluild">
        <div class="container">
            <div class="row align-items-stretch mb-4" v-if="user">
                <div class="col-md-3">
                    <div class="border rounded p-3 h-100">
                        <div class="text-center mb-3">
                            <img src="../assets/profile.jpg" alt="Avatar" class="img-fluid rounded-circle">
                        </div>
                    </div>
                </div>
                <div class="col-md-9">
                    <div class="border rounded p-3 h-100">
                        <div class="mb-3">

                            <p id="name"
                                style="font-size: 25px; display: inline-block; margin-left: 10px; margin-right: 5px;">
                                {{ user.first_name }} {{ user.last_name }}
                            </p>

                            <p v-if="user.is_staff" style="display: inline-block; margin-left: 10px;"> (ADMIN) </p>


                        </div>
                        <div class="mb-3">
                            <UserItem />
                            <p id="username" style=" display: inline-block; margin-left: 10px; margin-right: 5px;">
                                {{ user.username }}
                            </p>




                        </div>
                        <div class="mb-3">
                            <EmailItem />
                            <p id="email" style="display: inline-block; margin-left: 10px;"> {{ user.email }}</p>
                        </div>


                        <!-- <div class="mb-3">
                            <BirthdayItem />
                            <p id="age" style="display: inline-block; margin-left: 10px;">23</p>
                        </div>
                        <div class="mb-3">
                            <SexItem />
                            <p id="gender" style="display: inline-block; margin-left: 10px;">Male</p>
                        </div> -->
                        <div class="modal fade" id="editProfileModal" tabindex="-1" aria-labelledby="editProfileModalLabel"
                            aria-hidden=true>
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="editProfileModalLabel">Edit Profile</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <label for="first_name">First Name:</label>
                                        <input type="text" v-model="dataUser.first_name" class="form-control"
                                            id="first_name">
                                        <label for="last_name">Last Name:</label>
                                        <input type="text" v-model="dataUser.last_name" class="form-control"
                                            id="last_name">
                                        <label for="username">Username:</label>
                                        <input type="text" v-model="dataUser.username" class="form-control" id="username">
                                        <label for="email">Email:</label>
                                        <input type="text" v-model="dataUser.email" class="form-control" id="email">


                                    </div>

                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary"
                                            data-bs-dismiss="modal">Close</button>
                                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
                                            @click="saveChanges">Save
                                            changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="text-center" style="margin-top: 150px;">
                            <a href="#" class="btn btn-primary" @click='showModal'>Edit Profile</a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div id="history"></div>
            </div>
        </div>
    </div>
</template>

<script>

// import BirthdayItem from "../components/icons/BirthdayItem.vue"
import EmailItem from "../components/icons/EmailItem.vue"
// import SexItem from "../components/icons/SexItem.vue"
import * as bootstrap from 'bootstrap';
import UserItem from "../components/icons/UserItem.vue"

import { mapActions, mapState } from 'pinia';


import authStore from '@/stores/authStore';
export default {
    name: 'ProfilePage',
    components: {
        // BirthdayItem,
        EmailItem,
        // SexItem,
        UserItem
    },
    data() {
        return {
            dataUser: {
                first_name: "",
                last_name_: "",
                username: "",
                email: "",

            }
        };
    },
    watch: {
        dataUser: {
            handler: async function () {


            },
            immediate: true,
        },
    },

    computed: {
        ...mapState(authStore, ['user'])
    },
    methods: {
        ...mapActions(authStore, ['updateProfile']),
        async showModal() {
            try {
                const modal = new bootstrap.Modal(document.getElementById('editProfileModal'));
                this.dataUser = {
                    first_name: this.user.first_name,
                    last_name: this.user.last_name,
                    username: this.user.username,
                    email: this.user.email,
                };
                console.log(this.dataUser)
                modal.show();
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
        async saveChanges() {
            try {
                await this.updateProfile(this.dataUser)
            } catch (error) {
                console.error('Error updating profile', error);
            }
        }
    },
    async mounted() {

        console.log(this.user)

    }

}
</script>

<style scoped>
.mb-3 {
    display: flex;
    align-items: baseline;
}

.mb-3 p {
    margin-left: 10px;
}

.mb-3>div {
    margin-right: 10px;
}
</style>
