<template>
  <div class="d-flex justify-content-between align-items-center mb-5">
    <h4 class="mb-6">View Merchant Service</h4>
    <router-link
      :to="{ name: 'CreateBank' }"
      type="submit"
      class="px-3 btn btn-dark btn-sm"
    >
      Add Merchant Service
    </router-link>
  </div>

  <div>
      <b-col lg="6" sm="10">
          <b-card header="Merchant Service Listing">
              <div class="mb-3 d-flex justify-content-between align-items-center">
                  <div>
                      <select v-model="limit" id="">
                          <option value="1">1</option>
                          <option value="5">5</option>
                          <option value="10">10</option>
                          <option value="20">20</option>
                          <option value="50">50</option>
                        </select>
                    </div>
                    <div>
                        <form @search="fetchTypes">
                            <b-form-input v-model="search" />
                        </form>
                    </div>
                </div>
                <div v-if="galleries?.data && !galleries?.data?.length">
                  No record(s) found.
                </div>
            
                <div v-else>
          <div v-if="loading">Loading</div>
          <div
            class="table-responsive"
            v-if="galleries?.data?.length && !loading"
          >
            <!-- <view-table
              :items="galleries.data"
              :headers="columns"
              :from="galleries.from"
            /> -->
            <table class="table-bordered " style="width: 100%">
              <thead>
                  <tr>
                      <th>S.No.</th>
                      <th>Company</th>
                      <th>Service</th>                      
                      <th>Action</th>
                      <th>Delete</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="(item, index) in galleries?.data" :key="index">
                      <td>{{ index + galleries?.from }}.</td>
                      <td>{{ item.company_name }}</td>
                      <td>{{ item.service_name }}</td>
                      
                      <td>
                          <router-link :to="{name: 'EditMarchantService', params: {id: item.id}}">Edit</router-link>
                      </td>
                      <td>    <button v-on:click="deletecompany(item.id)">delete</button>
                      </td>
                  </tr>
              </tbody>
          </table>
            <!-- <EasyDataTable :headers="columns" :items="galleries"></EasyDataTable> -->
            <pagination
              :data="galleries"
              @pagination-change-page="fetchTypes"
            />
          </div>
        </div>
        </b-card>
      </b-col>
  </div>
</template>

<script>
import ApiExecute from "@/api";
import moment from "moment";

// import Vue3EasyDataTable from 'vue3-easy-data-table';
// import 'vue3-easy-data-table/dist/style.css';
import VuePaginate from "vue-paginate";

// import ViewTable from "../../components/ViewTable.vue";

export default {
  name: "ViewUserBank",
  components: {
    Pagination: VuePaginate,
    // ViewTable,
  },
  data() {
    return {
      galleries: null,
      columns: [
        { text: "Service", value: "service_name" },
        { text: "Compony", value: "company_name" },
      ],
      loading: false,
      limit: 10,
      search: "",
    };
  },

  mounted() {
    this.fetchTypes();
  },

  methods: {
    formatDate(value) {
      if (value) {
        return moment(String(value)).format("DD-MMM-YYYY hh:mm:ss");
      }
    },
    async fetchTypes(page = 1) {
      this.loading = true;
      let apiResponse = await ApiExecute(
        `merchantservice/?page=${page}&limit=${this.limit}&search=${this.search}`
      );
      this.loading = false;

      if (apiResponse.status) this.galleries = apiResponse.data;
    },
    async deletecompany(id){
            console.warn(id)
            let apiResponse = await ApiExecute(`merchantservice/${id}`, "DELETE");
            if(apiResponse.status){
              this.fetchTypes(1);

                this.$toast.success(`company deleted successfully`);
            }
            }
  },
  watch: {
    search() {
      this.fetchTypes(1);
    },
    limit() {
      this.fetchTypes(1);
    },
  },
};
</script>
