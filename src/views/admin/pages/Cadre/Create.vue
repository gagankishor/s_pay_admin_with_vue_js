<template>
  <b-container fluid>
    <div class="">
      <h4 class="mb-5">Add Cadre</h4>
    </div>
    <div class="mt-4"></div>
    <b-row>
      <form method="post" @submit="add_city" v-if="!loading">
      <b-col cols="4">
        <b-card>
          <div v-if="loading"></div>
            <b-row class="my-1">
              <b-col sm="3">
                <label for="input-none">Cadre:</label>
              </b-col>
              <b-col sm="9">
                <select v-model="state_id" class="form-select" required>
                  <option value="">SELECT CADRE LEVEL</option>
                  <option value="1">I</option>
                  <option value="2">II</option>
                  <option value="3">III</option>
                  <option value="4">IV</option>
                  <option value="5">V</option>
                  <option value="6">VI</option>
                  <option value="7">VII</option>
                  <option value="8">VIII</option>
                  <option value="9">IX</option>
                  <option value="10">X</option>
                  <option value="11">XI</option>
                  <option value="12">XII</option>
                  <!-- <option
                    v-for="state in states"
                    :value="state.id"
                    :key="state.id"
                  >
                    {{ state.name }}
                  </option> -->
                </select>
              </b-col>
            </b-row>
            <b-row class="my-1">
              <b-col sm="3">
                <label for="input-none">CADRE NAME:</label>
              </b-col>
              <b-col sm="9">
                <b-form-input
                  type="text"
                  v-model="name"
                  id="input-none"
                  :state="null"
                  placeholder="ENTER CADRE NAME"
                  required
                ></b-form-input>
              </b-col>
            </b-row>

            <b-button class="btform" type="submit" variant="success"
              >SAVE</b-button
            >
          </b-card>
        </b-col>
      </form>
      <b-col cols="8 ">
        <div class="country_header">
          <h6 class=" ">Cadre</h6>
        </div>

        <div>
          <b-card header="Cadre Listing">
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
            <div v-if="galleries?.data && !galleries?.data?.length">
              No record(s) found.
            </div>

            <div v-else>
              <div v-if="loading"><b-spinner /></div>
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
                          <th>NAME</th>
                          <th>State</th>
                          
                          <th>Action</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr v-for="(item, index) in galleries?.data" :key="index">
                          <td>{{ index + galleries?.from }}.</td>
                          <td>{{ item.name }}</td>
                          <td>{{ item.state_name }}</td>
                          
                          <td>
                              <router-link :to="{name: 'EditCity', params: {id: item.id}}">Edit</router-link>
                          </td>
                          <td>    <button v-on:click="deletecity(item.id)">delete</button>
                          </td>
                      </tr>
                  </tbody>
              </table>
               
              </div>
            </div>
          </b-card>
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
  name: "CreateCity",
  components: {
    // ViewTable,
    // Pagination: VuePaginate,
  },

  data() {
    return {
      state_id: "",
      name: "",
      states: [],
      galleries: null,
      columns: [
        { text: "CITY NAME", value: "name" },
        { text: "STATE NAME", value: "state_name" },
      ],

      loading: false,
      search: "",
      limit: 10,
    };
  },

  methods: {
    async add_city() {
      let formData = new FormData();
      formData.append("state_id", this.state_id);
      formData.append("name", this.name);

      this.loading = true;
      let apiResponse = await ApiExecute("", "POST", {
        data: formData,
      });
      this.loading = false;

      if (apiResponse.status) {
        this.$router.push({
          name: "CreateCity",
        });
        this.$toast.success(`city added successfully`);
      } else {
        this.$toast.error(`City not added`);
      }
    },
    async deletecity(id){
            console.warn(id)
            let apiResponse = await ApiExecute(`/${id}`, "DELETE");
            if(apiResponse.status){
              this.gettable(1);

                this.$toast.success(`company deleted successfully`);
            }
            },
    async getState() {
      this.loading = true;
      let apiResponses = await ApiExecute(``);

      this.loading = false;
      if (apiResponses.status) this.states = apiResponses.data.data;
    },
    resetData: function () {
      this.state_id = "";
      this.name = "";
      this.states = [];
    },

    async gettable(page = 1) {
      this.loading = true;
      let apiResponse = await ApiExecute(
        `/?page=${page}&limit=${this.limit}&search=${this.search}`
      );
      this.loading = false;
      if (apiResponse.status) this.galleries = apiResponse.data;
    },
  },
  mounted() {
    //this.fetchTypes()
    this.getState();
    this.gettable();
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
<style>
.btform {
  margin-left: 28%;
}
</style>
