<template>
    <div class="container-fluild">
        <div class="container mt-3">
            <div class="d-flex justify-content-between align-items-center">
                <h1 class="mb-0">Driver</h1>
                <div class="row">
                    <div class="col-12">
                        <label for="class-type" id="class">Select Class:</label>
                        <select v-model="Class" id="class-type" class="form-select">
                            <option value="All">All</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                        </select>
                    </div>
                </div>

                <button  v-if="user && user.is_staff" type="button" class="btn btn-primary" id="addBusBtn" @click="showModal">+ Add Driver</button>

            </div>
            <hr class="line">
            <div class="row">
                <div v-for="(item, index) in drivers" :key="index" class="col-md-4">
                    <div class="card mb-4">
                        <button v-if="user && user.is_staff" @click="DeleteDriver(item.id)"
                            class="btn btn-danger delete-button position-absolute top-0 end-0 m-2">
                            <i class="bi bi-x"></i>
                        </button>
                        <img src="../assets/driver.png" class="card-img-top"
                            style="width: 23%; height: auto; position: absolute; top: 0; left: 0;margin-left : 10px;">
                        <div class="card-body">
                            <div class="header">
                                <span class="name mb-2">{{ item.name }}</span>
                                <br>
                                <span class="birthday mb-2">{{ item.birthday }}</span>
                                <br>
                                <span class="class mb-2">Class : {{ item.class_name }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="addDriverModal" tabindex="-1" aria-labelledby="addDriverModalLabel"
                aria-hidden=true>
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="addDriverModalLabel">Add Driver</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <label for="driverName">Name:</label>
                            <input type="text" v-model="dataNewUser.name" class="form-control" id="driverName">

                            <label for="driverBirthday">Birthday (dd/mm/yyyy):</label>
                            <input type="date" v-model="dataNewUser.birthday" class="form-control" id="driverBirthday">


                            <label for="driverPassport">Passport Data:</label>
                            <input type="text" v-model="dataNewUser.passport_data" class="form-control" id="driverPassport">

                            <label for="driverClass">Class Name:</label>
                            <input type="text" v-model="dataNewUser.class_name" class="form-control" id="driverClass">

                            <label for="driverExperience">Work Experience:</label>
                            <input type="text" v-model="dataNewUser.work_experience" class="form-control"
                                id="driverExperience">

                            <label for="driverSalary">Base Salary:</label>
                            <input type="text" v-model="dataNewUser.base_salary" class="form-control" id="driverSalary">
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="AddDriver">Save
                                changes</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import authStore from '@/stores/authStore';
import * as bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import driverStore from '@/stores/driverStore'
import { mapActions, mapState } from 'pinia';

export default {
    data() {
        return {
            Class: "All",
            dataNewUser: {
                name: "",
                birthday: "",
                passport_data: "",
                class_name: "",
                work_experience: 0,
                base_salary: 0.0
            }
        };
    },
    watch: {
        Class: {
            handler: async function (newVal) {
                let response = null;
                if (newVal !== "All") {
                    response = await this.getDriverByClass(newVal);
                } else {
                    response = await this.getAllDriver();
                }
                console.log(response);
            },
            immediate: true,
        },
    },

    computed: {
        ...mapState(driverStore, ['drivers']),
        ...mapState(authStore, ['user'])
    },
    methods: {
        ...mapActions(driverStore, ['getAllDriver']),
        ...mapActions(driverStore, ['getDriverByClass']),
        ...mapActions(driverStore, ['deleteDriver']),
        ...mapActions(driverStore, ['addDriver']),

        async showModal() {
            try {
                const modal = new bootstrap.Modal(document.getElementById('addDriverModal'));
                modal.show();
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
        async AddDriver() {
            console.log(this.dataNewUser)
            await this.addDriver(this.dataNewUser)
            location.reload()
        },
        async DeleteDriver(id) {
            console.log(id)
            await this.deleteDriver(id)
            location.reload()

        }
    },
    async mounted() {
        
        await this.getAllDriver()
        
    }


}
</script>

<style scoped>
.card {
    width: 100%;
    height: 100px;
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
}
</style>
