<template>
    <div class="d-flex justify-content-between align-items-center mb-5">
        <h4 class="mb-6">View Company</h4>
        <router-link :to="{name:'CreateBank'}" type="submit" class="px-3 btn btn-dark btn-sm">
          Add New Company
        </router-link>
      </div>

    <div>
        <div v-if="galleries?.data && !galleries?.data?.length">
            No record(s) found.
        </div>
        <div v-else>
            <b-card header="Company Listing">
                <div class="mb-3 d-flex justify-content-between align-items-center">
                    <div>
                        <label for="">Page Limit: &nbsp;</label>
                        <select v-model="limit" id="">
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    </div>
                    <div>
                        <form @search="fetchTypes">
                            <b-form-input type="search" placeholder="Search..." v-model="search" />
                        </form>
                      </div>                 
                </div>
                <div class="text-center" v-if="loading">
                    <b-spinner /> Loading
                </div>
                <div class="table-responsive" v-if="galleries?.data?.length && !loading">
                    <table class="table-bordered " style="width: 100%">
                        <thead>
                            <tr>
                                <th>S.No.</th>
                                <th>Logo</th>
                                <th>NAME</th>
                                <!-- <th>Domain</th> -->
                                <th>Contact Info</th>
                                <!-- <th>Email</th>
                                <th>Phone</th> -->
                                <th>Licence</th>
                                <th>City Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in galleries?.data" :key="index">
                                <td>{{ index + galleries?.from }}.</td>
                                <td><img :src="item.logo" style="width: 50px; height: 50px; object-fit: contain;" /></td>
                                <td>{{ item.name }}<br />
                                    <small>({{ item.domain }})</small>
                                </td>
                                <td>{{ item.email }}<br/>{{ item.phone }}</td>
                                <td>{{ item.licence }}</td>
                                <td>{{ item.city_name }}</td>
                                <!-- <td>{{ item.logo }}</td> -->
                                <td>
                                    <router-link :to="{name: 'EditCompany', params: {id: item.id}}">Edit</router-link><br/>
                                    <button v-on:click="deletecompany(item.id)">delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                   
                    <pagination :data="galleries" @pagination-change-page="fetchTypes" />
                </div>
            </b-card>
        </div>

    </div>
</template>


<script>
import ApiExecute from '@/api';
// import Vue3EasyDataTable from 'vue3-easy-data-table';
// import 'vue3-easy-data-table/dist/style.css';
import VuePaginate from 'vue-paginate'
export default {
    name: 'ViewUser',
    components: {
        "Pagination": VuePaginate,
    },
    data() {
        return {
            galleries: null,
            columns: [
                { text: 'Domain', value: 'domain' },
                { text: 'Name', value: 'name' },
                { text: 'Email', value: 'email' },
                { text: 'Phone', value: 'phone' },
                { text: 'Logo', value: 'logo' },
                { text: 'Licence', value: 'licence' },
                { text: 'City Name', value: 'city_name' },        
            ],
            loading: false,
            limit: 10,
            search: ''
        }
    },

    mounted() {
        this.fetchTypes()
        this.deletecompany()
    },

    methods: {  
        async fetchTypes(page = 1) {
            this.loading = true
            let apiResponse = await ApiExecute(`company/?page=${page}&limit=${this.limit}&search=${this.search}`);
            this.loading = false
            if (apiResponse.status)
                this.galleries = apiResponse.data
        },
        async deletecompany(id){
            console.warn(id)
            let apiResponse = await ApiExecute(`company/${id}`, "DELETE");
            if(apiResponse.status){
            this.fetchTypes(1)

                this.$toast.success(`Service deleted successfully`);
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