<template>
    <div class="container-fluid  availability-form p-0">
        <div class="row">
            <div class="col-12">
                <img src="../assets/bus.jpg" alt="bus" class="img-fluid w-100 h-50">

            </div>
            <div class="col-lg-10 bg-white shadow p-4 rounded position-absolute top-50 start-50 translate-middle mt-5">
                <h5 class="col-lg-3">Find route information</h5>
                <form @submit.prevent="handleFind">
                    <div class="row align-items-end">
                        <div class="col-lg-3 mb-3">
                            <label class="form-label" style="font-weight: 500;">From</label>
                            <select v-model="from" class="form-select shadow-none">
                                <option v-for="route in routes" :key="route.id" :value="route.start_point">
                                    {{ route.start_point }}
                                </option>
                            </select>
                        </div>
                        <!-- ... -->
                        <div class="col-lg-3 mb-3">
                            <label class="form-label" style="font-weight: 500;">To</label>
                            <select v-model="to" class="form-select shadow-none">
                                <option v-for="route in routes" :key="route.id" :value="route.end_point">
                                    {{ route.end_point }}
                                </option>
                            </select>
                        </div>
                        <div class="col-lg-3 mb-3">
                            <label class="form-label" style="font-weight: 500;">Date</label>
                            <input v-model="date" type="date" class="form-control shadow-none">
                        </div>

                        <div class="col-lg-2 mb-lg-3 mt-2">
                            <button type="submit" class="btn btn-primary w-100">Submit</button>
                        </div>
                    </div>
                </form>

            </div>


        </div>


    </div>
</template>
<script>
import 'bootstrap/dist/css/bootstrap.min.css';

import { mapActions, mapState } from 'pinia';

import routeStore from '@/stores/routeStore';
export default {


    data() {
        return {
            from: '',
            to: '',
            date: ''

        }
    },
    computed: {
        ...mapState(routeStore, ['routes'])
    },
    methods: {
        ...mapActions(routeStore, ['getAllRoute']),
        ...mapActions(routeStore, ['getRouteByData']),
        async handleFind() {
            try {
                // const result = await this.getRouteByData({
                //     start_point: this.from,
                //     end_point: this.to,
                //     date: this.date

                // });
                const searchData = {
                    start_point: this.from,
                    end_point: this.to,
                    date: this.date
                };
                localStorage.setItem('searchData', JSON.stringify(searchData));

     
                
                this.$router.push({ name: 'result'});



            } catch (error) {
                console.error('Error:', error);
            }
        },

    },
    async mounted() {

        await this.getAllRoute()


    }
}
</script>
<style scoped>
.availability-form {
    margin-top: -50px;
    z-index: 2;
    position: relative;
    margin-bottom: -250px
}

@media screen and (max-width: 575px) {
    .availability-form {
        margin-top: 25px;
        padding: 0 35px;
    }

}
</style>