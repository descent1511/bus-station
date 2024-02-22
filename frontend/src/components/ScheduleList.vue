<template>
    <div class="container-fluild">
        <div class="container mt-3">
            <div class="d-flex justify-content-between align-items-center">
                <h1 class="mb-0">Schedule</h1>
                <button type="button" class="btn btn-primary" id="addScheduleBtn" @click="showModal">+ Add Schedule</button>
            </div>
            <hr class="line">
            <div class="row">
                <div v-for="(item, index) in schedules" :key="index" class="row mb-4">
                    <div class="col">
                        <div class="card">
                            <button @click="DeleteSchedule(item.id)"
                                class="btn btn-danger delete-button position-absolute top-0 end-0 m-2">
                                <i class="bi bi-x"></i>
                            </button>
                            <div class="card-body">
                                <div class="header">
                                    <span class="start-date">{{ item.start_date }}</span>
                                    <span class="end-date">{{ item.end_date }}</span>
                                    <span class="driver-name">{{ item.driver.name }}</span>
                                </div>
                                <div class="route-info mt-3">
                                    <p><strong>From:</strong> {{ item.route.start_point }}</p>
                                    <p><strong>To:</strong> {{ item.route.end_point }}</p>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="addScheduleModal" tabindex="-1" aria-labelledby="addScheduleModalLabel"
                aria-hidden=true>
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="addScheduleModalLabel">Add Schedule</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

                        </div>
                        <div class="modal-body">
                            

                            <label class="form-label" style="font-weight: 500;">Driver</label>
                            <select v-model="dataNewSchedule.driver" class="form-select shadow-none">
                                <option v-for="driver in drivers" :key="driver.id" :value="driver.id">
                                    {{ driver.name }}
                                </option>
                            </select>

                            <label class="form-label" style="font-weight: 500;">Bus</label>
                            <select v-model="dataNewSchedule.bus" class="form-select shadow-none">
                                <option v-for="bus in buses" :key="bus.id" :value="bus.id">
                                    {{ bus.registration_number }}
                                </option>
                            </select>

                            <label class="form-label" style="font-weight: 500;">Route</label>
                            <select v-model="dataNewSchedule.route" class="form-select shadow-none">
                                <option v-for="route in routes" :key="route.id" :value="route.id">
                                    {{ route.start_point }} -> {{ route.end_point }}
                                </option>
                            </select>

                            <label for="start_date">Start date:</label>
                            <input type="date" v-model="dataNewSchedule.start_date" class="form-control" id="start_date">

                            <label for="end_date">End date:</label>
                            <input type="date" v-model="dataNewSchedule.end_date" class="form-control" id="end_date">

                            <label for="start_time">Start time:</label>
                            <input type="time" v-model="dataNewSchedule.start_time" class="form-control" id="start_time">

                            <label for="end_time">End time:</label>
                            <input type="time" v-model="dataNewSchedule.end_time" class="form-control" id="end_time">


                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="AddSchedule">Save
                                changes</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import * as bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import scheduleStore from '@/stores/scheduleStore'
import driverStore from '@/stores/driverStore'
import busStore from '@/stores/busStore'
import routeStore from '@/stores/routeStore';
import { mapActions, mapState } from 'pinia';
export default {
    data() {
        return {
            dataNewSchedule: {
                driver: "",
                bus: "",
                route: "",
                start_date: "",
                end_date: "",
                start_time: "",
                end_time: ""

            }
        };
    },
    computed: {
        ...mapState(scheduleStore, ['schedules']),
        ...mapState(driverStore, ['drivers']),
        ...mapState(busStore, ['buses']),
        ...mapState(routeStore, ['routes']),
    },
    methods: {
        ...mapActions(driverStore, ['getAllDriver']),
        ...mapActions(busStore, ['getAllBus']),
        ...mapActions(routeStore, ['getAllRoute']),
        ...mapActions(scheduleStore, ['getAllSchedule']),
        ...mapActions(scheduleStore, ['addSchedule']),
        ...mapActions(scheduleStore, ['deleteSchedule']),
        async showModal() {
            try {
                const modal = new bootstrap.Modal(document.getElementById('addScheduleModal'));
                modal.show();
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
        async AddSchedule() {

            await this.addSchedule(this.dataNewSchedule)
           
            location.reload()
        },
        async DeleteSchedule(id) {

            await this.deleteSchedule(id)
            location.reload()

        }

    },
    async mounted() {
        await this.getAllSchedule()

        console.log(this.schedules)
    }

}
</script>

<style scoped>
.result-page {
    max-width: 800px;
    /* Adjust the maximum width as needed */
    margin: auto;
}

.card {
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);


}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.start-date,
.end-date,
.driver-name {
    font-weight: bold;
}

.route-info p {
    margin: 5px 0;
}

/* Style the "No results found" message */
.no-results {
    color: #888;
    text-align: center;
}


</style>