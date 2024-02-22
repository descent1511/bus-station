<template>
    <div class="container-fluild">
        <div class="container mt-3">
            <div class="d-flex justify-content-between align-items-center">
                <h1 class="mb-0">Bus</h1>
                <button v-if="user && user.is_staff" type="button" class="btn btn-primary" id="addBusBtn"  @click="showModal">+ Add Bus</button>
            </div>
            <hr class="line">
            <div class="row">
                <div v-for="(item, index) in buses" :key="index" class="col-md-4">
                    <div class="card mb-4">
                        <button v-if="user && user.is_staff" @click="DeleteBus(item.id)" 
                            class="btn btn-danger delete-button position-absolute top-0 end-0 m-2"  >
                            <i class="bi bi-x"></i>
                        </button>
                        <img src="../assets/bus.png" class="card-img-top"
                            style="width: 23%; height: auto; position: absolute; top: 0; left: 0;margin-left : 10px;">
                        <div class="card-body">
                            <div class="header">
                                <span class="registration_number mb-2">License plates: </span>
                                <span class="registration_number mb-2"  style="font-weight: bold;"> {{ item.registration_number }}</span>
                                
                                <br>
                                <span class="class mb-2">Capacity : {{ item.capacity }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="addBusModal" tabindex="-1" aria-labelledby="addBusModalLabel"
                aria-hidden=true>
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="addBusModalLabel">Add Bus</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <label for="registration_number">Registration number:</label>
                            <input type="text" v-model="dataNewBus.registration_number" class="form-control" id="registration_number">

                            <label for="capacity">Capacity:</label>
                            <input type="text" v-model="dataNewBus.capacity" class="form-control" id="capacity">
                           

                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="AddBus">Save
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
import busStore from '@/stores/busStore'
import { mapActions, mapState } from 'pinia';

export default {
    data() {
        return {
            dataNewBus: {
                registration_number: "",
                capacity: ""
                
            }
        };
    },
    computed: {
        ...mapState(busStore, ['buses']),
        ...mapState(authStore, ['user'])
    
    },
    methods: {
        ...mapActions(busStore, ['getAllBus']),
        ...mapActions(busStore, ['addBus']),
        ...mapActions(busStore, ['deleteBus']),
        async showModal() {
            try {
                const modal = new bootstrap.Modal(document.getElementById('addBusModal'));
                modal.show();
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
        async AddBus() {
           
            await this.addBus(this.dataNewBus)
            location.reload()
        },
        async DeleteBus(id) {
           
            await this.deleteBus(id)
            location.reload()

        }
     
    },
    async mounted() {
        
        await this.getAllBus()
      
      
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
