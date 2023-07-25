<template>
  
  <b-container fluid>
    <div class="">
      <h4 class="mb-5">Add State</h4>
    </div>
    <div class="mt-4"></div>
    <b-row>
      <b-col cols="4">
        <div class="text-center" v-if="loading">
          <b-spinner /> Loading
        </div>
        <b-card>
        <form method="post" @submit="addstate"  v-if="!loading">
        <b-row class="my-1">
          <b-col sm="12">
            <label for="input-none" >  NAME:</label>
         
            <b-form-input
              type="text"
              v-model="name"
              id="input-none"
              :state="null"
              placeholder="ENTER STATE NAME"
              required
            >
            <b-form-group id="example-input-group-1" label="Name" label-for="example-input-1">
              <b-form-input
                id="example-input-1"
                name="example-input-1"
                v-model="form.name"
                v-validate="{ required: true, min: 3 }"
                :state="validateState('example-input-1')"
                aria-describedby="input-1-live-feedback"
                data-vv-as="Name"
              ></b-form-input>
      
              <b-form-invalid-feedback id="input-1-live-feedback">{{ veeErrors.first('example-input-1') }}</b-form-invalid-feedback>
            </b-form-group>
          </b-form-input>
          </b-col>
        </b-row>

        <b-button class="btform" type="submit" variant="success"
          >ADD STATE</b-button
        >
      </form>
      
    </b-card> 
  </b-col>
      <b-col cols="8 ">
        <div class="country_header">
          <h6 class=" "></h6>
        </div>

        
        <div>
          <div v-if="galleries?.data && !galleries?.data?.length">
            No record(s) found.
          </div>
      
          <div v-else>
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
                <form @search="gettable">
                  
                    <b-form-input v-model="search" />
                </form>
              </div>
            </div>
            <div v-if="loading">
              <!-- <b-icon icon="tools"></b-icon> -->
            </div>
            <div class="table-responsive" v-if="galleries?.data?.length && !loading">
              <table class="table-bordered " style="width: 100%">
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>NAME</th>
                        
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in galleries?.data" :key="index">
                        <td>{{ index + galleries?.from }}.</td>
                        <td>{{ item.name }}</td>
                        
                        <td>
                            <router-link :to="{name: 'EditState', params: {id: item.id}}">Edit</router-link>
                        </td>
                        <!-- <td>    <button v-on:click="deletecompany(item.id)">delete</button>
                        </td> -->
                    </tr>
                </tbody>
            </table>
              <!-- <EasyDataTable :headers="columns" :items="galleries"></EasyDataTable> -->
              <!-- <pagination :data="galleries" @pagination-change-page="gettable" /> -->
            </div>
            </b-card>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
//import ApiExecute from '@/api';
// import VuePaginate from "vue-paginate";
// import ViewTable from "../../components/ViewTable.vue";
import ApiExecute from "@/api";


//import moment from "moment"

export default {
  name: "CreateState",
  components: {
    // ViewTable,
    // Pagination: VuePaginate,
  },
  data() {
    return {
      name: "",
      galleries: null,
      columns: [{ text: "Name", value: "name" }],
      loading: false,
      search: "",
      limit: 10,
    };
  },
  mounted() {
    this.getState();
    this.gettable();
  },
  methods: {
    
    async gettable(page = 1) {
      this.loading = true;
      let apiResponse = await ApiExecute(
        `state/?page=${page}&limit=${this.limit}&search=${this.search}`
      );
      this.loading = false;
      if (apiResponse.status) this.galleries = apiResponse.data;
    },

    async addstate() {
      let formData = new FormData();

      formData.append("name", this.name);

      this.loading = true;
      let apiResponse = await ApiExecute("state", "POST", {
        data: formData,
      });
      this.loading = false;

      if (apiResponse.status) {
        this.$toast.success(`state added successfully`);
        this.resetData();
        // this.gettable();
      } else {
        this.$toast.error(`state NOT added `);
      }
    },
    async getState() {
      this.loading = true;
      let apiResponses = await ApiExecute(`state`);

      this.loading = false;
      if (apiResponses.status) this.states = apiResponses.data.data;
    },
    resetData: function () {
      this.name = "";
    },
    async deletecompany(id){
            console.warn(id)
            let apiResponse = await ApiExecute(`company/${id}`, "DELETE");
            if(apiResponse.status){
              this.gettable(1);

                this.$toast.success(`company deleted successfully`);
            }
            }
    // validateState(ref) {
    //   if (
    //     this.veeFields[ref] &&
    //     (this.veeFields[ref].dirty || this.veeFields[ref].validated)
    //   ) {
    //     return !this.veeErrors.has(ref);
    //   }
    //   return null;
    // },
    // resetForm() {
    //   this.form = {
    //     name: null,
        
    //   };

    //   this.$nextTick(() => {
    //     this.$validator.reset();
    //   });
    // },
    
  
    
  },
  watch: {
    search() {
      this.gettable(1);
    },
    limit() {
      this.gettable(1);
    },
  },
};
</script>



