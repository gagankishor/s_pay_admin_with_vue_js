<template>
    
    <div class="d-flex justify-content-between align-items-center mb-5">
        <h4 class="mb-6">View User</h4>
        <router-link :to="{name:'CreateBank'}" type="submit" class="px-3 btn btn-dark btn-sm">
          Add New User
        </router-link>
      </div>


    <div>
        <div v-if="galleries?.data && !galleries?.data?.length">
            No record(s) found.
        </div>

        <div v-else>
            <b-col lg="10" sm="15" >

            <b-card header="Company Listing">
            <div class="mb-3 d-flex justify-content-between align-items-center">
                <div>
                    <select v-model="limit" id="">
                          <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </div>
                <div>
                    <form @search="fetchTypes">
                      
                        <b-form-input v-model="search" />
          
                    </form>
                  </div>
             
            </div>
            <div v-if="loading">
                Loading
            </div>
            <div class="table-responsive" v-if="galleries?.data?.length && !loading">

                <!-- <view-table :items="galleries.data" :headers="columns" :from="galleries.from" />
                <EasyDataTable :headers="columns" :items="galleries"></EasyDataTable>
                <pagination :data="galleries" @pagination-change-page="fetchTypes" /> -->
                <table class="table-bordered " style="width: 100%">
                    <thead>
                        <tr>
                            <th>S.No.</th>
                            <th>NAME</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Company</th>
                            <th>Action</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in galleries?.data" :key="index">
                            <td>{{ index + galleries?.from }}.</td>
                            <td>{{ item.add_name }}</td>
                            <td>{{ item.email }}</td>
                            <td>{{ item.phone }}</td>
                            <td>{{ item.company_name }}</td>
                           
                            <td>
                                <router-link :to="{name: 'EditUser', params: {id: item.id}}">Edit</router-link>
                            </td>
                            <td>    <button v-on:click="deletecompany(item.id)">delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            </b-card>
            </b-col>
        </div>

    </div>
</template>


<script>
import ApiExecute from '@/api';
import moment from "moment"

// import Vue3EasyDataTable from 'vue3-easy-data-table';
// import 'vue3-easy-data-table/dist/style.css';
// import VuePaginate from 'vue-paginate'

// import ViewTable from '../../components/ViewTable.vue';


export default {
    name: 'ViewUser',
    components: {
        // "Pagination": VuePaginate,
        // ViewTable
    },
    data() {
        return {
            galleries: null,
            columns: [
                { text: 'Name', value: 'add_name' },
                { text: 'Email', value: 'email' },
                { text: 'Phone', value: 'phone' },
                { text: 'Company Name', value: 'company_name' },
                // { text: 'Password', value: 'Password' },
                
            ],
            loading: false,
            limit: 10,
            search: ''
        }
    },

    mounted() {
        this.fetchTypes()
    },

    methods: {
        formatDate(value) {
            if (value) {
                return moment(String(value)).format('DD-MMM-YYYY hh:mm:ss')
            }
        },
        async fetchTypes(page = 1) {
            this.loading = true
            let apiResponse = await ApiExecute(`user/?page=${page}&limit=${this.limit}&search=${this.search}`);
            this.loading = false
            if (apiResponse.status)
                this.galleries = apiResponse.data
        },
        async deletecompany(id){
            console.warn(id)
            let apiResponse = await ApiExecute(`company/${id}`, "DELETE");
            if(apiResponse.status){
                this.fetchTypes(1)

                this.$toast.success(`company deleted successfully`);
            }
            }
    },
    watch: {
        search() {
            this.fetchTypes(1)
        },
        limit() {
            this.fetchTypes(1)
        }
    }
}
</script>