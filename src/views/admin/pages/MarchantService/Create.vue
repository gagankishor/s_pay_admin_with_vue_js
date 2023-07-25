<template>
  <b-container fluid>
    <form method="post" @submit="add_type" v-if="!loading">
      <div class="d-flex justify-content-between align-items-center mb-5">
        <h4 class="mb-5">Add Merchant Services</h4>
      <b-button
      type="submit"
      variant="success"
      class="btn btn-primary"
      >ADD SERVICES</b-button
    >    </div>
    
    
        <div v-if="loading">Loading</div>
        <b-row>
        
        <b-col sm="8" lg="6">
            
            <b-card header="Service">
              <b-row>
            
            <b-col sm="6">
              <b-form-group class="mt-4" label="SERVICE NAME">
                <select v-model="service_id" class="form-select" required>
                  <option value="">SERVICE NAME</option>
                  <option
                    v-for="service in services"
                    :value="service.id"
                    :key="service.id"
                  >
                    {{ service.title }}
                  </option>
                </select>
              </b-form-group>
            </b-col>
            <b-col sm="6">
              <b-form-group class="mt-4" label="COMPANY NAME">
                <select v-model="company_id" class="form-select" required>
                  <option value="">COMPANY NAME</option>

                  <option
                    v-for="company in companys"
                    :value="company.id"
                    :key="company.id"
                  >
                    {{ company.name }}
                  </option>
                </select>
              </b-form-group>
            </b-col>
        </b-row>
            <b-row rows="6">
              <b-col cols="4">
                <div style="margin-top: 10%">
                  
                </div>
              </b-col>
            </b-row>
          
      </b-card>
    </b-col>
  </b-row>
</form>
  </b-container>
</template>
<script>
import ApiExecute from "@/api";

import moment from "moment";

export default {
  name: "CreateBank",

  data() {
    return {
      service_id: "",
      company_id: "",
      loading: false,
      search: "",
      titel: "",
     
      services: [],
      companys: [],
    };
  },

  methods: {
    formatDate(value) {
      if (value) {
        return moment(String(value)).format("DD-MMM-YYYY hh:mm:ss");
      }
    },
    async add_type() {
      let formData = new FormData();
      formData.append("company_id", this.company_id);
      formData.append("service_id", this.service_id);

      this.loading = true;
      let apiResponse = await ApiExecute("merchantservice", "POST", {
        data: formData,
      });
      this.loading = false;

      if (apiResponse.status) {
        this.name = "";
        // alert("saved")
        this.$toast.success(`Added successfully`);
        this.resetData();
        // this.$router.push({
        //     name: 'AdminPurchasesDashboard'
        // })
      }
    },

    async getService() {
      this.loading = true;
      let apiResponses = await ApiExecute(`service`);

      this.loading = false;
      if (apiResponses.status) {
        this.services = apiResponses.data.data;
      }
    },
    async getCompany() {
      this.loading = true;
      let apiResponses = await ApiExecute(`company`);
      this.loading = false;

      if (apiResponses.status) {
        this.companys = apiResponses.data.data;
      }
    },
    resetData: function () {
      this.service_id = "";
      this.company_id = "";
      this.services = [];
      this.companys = [];
    },
  },
  mounted() {
    //this.fetchTypes()
    this.getService();
    this.getCompany();
  },
  // watch: {
  //     search() {
  //         this.fetchTypes(1)
  //         this.getBank(1)
  //         this.getUser(1)
  //     },
  //     limit() {
  //         this.fetchTypes(1)
  //         this.getBank(1)
  //         this.getUser(1)
  //     }
  // },
};
</script>
