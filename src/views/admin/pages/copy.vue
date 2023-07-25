<template>
    <b-container fluid>
        <div class="">
            <h4 class="mb-5">ADD BANK</h4>
        </div>
        <div class="mt-4"></div>
        <b-row>
            <b-col cols="4">
                <div v-if="loading">
                    Loading
                </div>
                <form method="post" @submit="add_type" v-if="!loading">

                    <div class="country_header">
                        <h6 class="">ADD BANK</h6>
                    </div>
                    <div class="mt-4 ">
                        <label for="c"></label>

                    </div>
                    <input type="text" id="c" v-model="name" placeholder="" class="form-control  mt-2 mb-4 " />



                    <div class="d-grid">
                        <b-button type="submit" variant="success">ok.sub</b-button>
                    </div>
                </form>
            </b-col>
            <b-col cols="8 ">




                <div style="margin-top:20px ;">
                    <div v-if="galleries?.data && !galleries?.data?.length">
                        No record(s) found.
                    </div>

                    <div v-if="galleries?.data">
                        <div style="display: flex; justify-content: space-between;margin-bottom: 20px;">
                            <div>
                                <select v-model="limit" id="">
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="30">30</option>
                                    <option value="50">50</option>
                                </select>
                            </div>
                            <div>
                                <input type="search" placeholder="Search..." v-model="search">
                            </div>
                        </div>
                        <div v-if="loading">
                            Loading
                        </div>
                        <div class="table-responsive " v-if="galleries?.data?.length && !loading">

                            <view-table :items="galleries.data" :headers="columns" :from="galleries.from" />
                            <!-- <EasyDataTable :headers="columns" :items="galleries"></EasyDataTable> -->
                            <pagination :data="galleries" @pagination-change-page="fetchTypes" />
                        </div>
                    </div>

                </div>
            </b-col>
        </b-row>
    </b-container>
</template>
<script>
import ApiExecute from '@/api';
import ViewTable from '../../components/ViewTable.vue';
import moment from "moment"

export default {
    name: 'CreatePage',
    components: {
        ViewTable
    },
    data() {
        return {
            countrys: [
                { id: 1, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
                { id: 2, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
                { id: 3, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
                { id: 4, age: 38, first_name: 'Jami', last_name: 'Carney' },
                { id: 1, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
                { id: 2, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
                { id: 3, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
                { id: 4, age: 38, first_name: 'Jami', last_name: 'Carney' },
                { id: 1, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },

            ],
            name: '',

            galleries: null,
            columns: [
                { text: 'name', value: 'name' },


            ],
            loading: false,
            limit: 8,
            search: '',

        }
    },

    methods: {
        formatDate(value) {
            if (value) {
                return moment(String(value)).format('DD-MMM-YYYY hh:mm:ss')
            }
        },
        async add_type() {
            let formData = new FormData();
            formData.append('name', this.name);

            this.loading = true;
            let apiResponse = await ApiExecute("add-bank", "POST", {
                data: formData
            });
            this.loading = false;

            if (apiResponse.status) {
                this.name = ''

                // this.$router.push({
                //     name: 'AdminPurchasesDashboard'
                // })
            }
        },

        async fetchTypes(page = 1) {
            this.loading = true
            let apiResponse = await ApiExecute(`add-bank/?add-bank=${page}&limit=${this.limit}&search=${this.search}`);
            this.loading = false
            if (apiResponse.status)
                this.galleries = apiResponse.data
        },
    },
    mounted() {

        this.fetchTypes()
    },
    watch: {
        search() {
            this.fetchTypes(1)
        },
        limit() {
            this.fetchTypes(1)
        }
    },
}

</script>