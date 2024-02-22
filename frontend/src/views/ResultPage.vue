<template>
    <div>
        
        <div v-if="results.length > 0">
            <div v-for="(item, index) in results" :key="index" class="row mb-4">
                <div class="col">
                    <div class="card">
                        <div class="card-body">
                            <div class="header">
                                <span class="start-date">{{item.start_date}}</span>
                                <span class="end-date">{{ item.end_date }}</span>
                                <span class="driver-name">{{ item.driver.name }}</span>
                            </div>
                            <div class="route-info mt-3">
                                <p><strong>From:</strong> {{ item.route.start_point }}</p>
                                <p><strong>To:</strong> {{ item.route.end_point }}</p>
                                <!-- Add other route information as needed -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <p class="mt-4">No results found.</p>
        </div>
    </div>
</template>

<script>
import routeStore from '@/stores/routeStore';
import { mapActions } from 'pinia';

export default {
    data() {
        return {
            results: [],
        };
    },

    methods: {
        ...mapActions(routeStore, ['getRouteByData']),

        formatDate(dateString) {
            // Implement your date formatting logic here
            return new Date(dateString).toLocaleDateString();
        },
    },

    async mounted() {
        try {
            const searchDataString = localStorage.getItem('searchData');

            if (searchDataString) {
                const searchData = JSON.parse(searchDataString);
            
                try {
                    const apiResults = await this.getRouteByData(searchData);
                    this.results = apiResults.data;
            
                } catch (error) {
                    console.error('Error fetching results:', error);
                }
            } else {
                console.error('No search data found in local storage');
            }
        } catch (error) {
            console.error('An unexpected error occurred:', error);
        }
    },
};
</script>
<style scoped>
/* Add some styling for the Result Page component */
.result-page {
    max-width: 800px; /* Adjust the maximum width as needed */
    margin: auto;
}

.card {
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 80%;
    margin: auto; /* Center the card horizontally */
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
