<template>
 <b-container fluid>
   <form method="post" @submit="add_user" v-if="!loading">
        <div class="d-flex justify-content-between align-items-center mb-5">
          <h4 class="mb-6">Add Adviser</h4>
          <b-button type="submit" class="px-5" variant="success">
            Save
          </b-button>
        </div>
        <b-col sm="8" lg="8">
      <b-card>
          <b-row class="my-1">
            <b-col sm="6">
              <label for="input-none">Name:</label>

              <b-form-input
                type="text"
                v-model="add_name"
                id="input-none"
                :state="null"
                placeholder="Name"
                required
              ></b-form-input>
            </b-col>

            <b-col sm="6">
              <label for="input-none">Email:</label>

              <b-form-input
                type="email"
                v-model="email"
                id="input-none"
                :state="null"
                placeholder="Email"
                required
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="6">
              <label for="input-none">Phone:</label>

              <b-form-input
                type="text"
                v-model="phone"
                id="input-none"
                pattern="\d{10}"
                title="Please enter 10 digit mobile no."
                :state="null"
                placeholder="Phone"
                required
              ></b-form-input>
            </b-col>

            <b-col sm="6">
              <label for="input-none">Password:</label>

              <b-form-input
                type="password"
                v-model="Password"
                id="input-none"
                :state="null"
                placeholder="Password"
                required
              ></b-form-input>
            </b-col>
          </b-row>
          
          <b-row class="my-1">
            <b-col sm="6">
              <label for="input-none">Cader Name:</label>

              <b-form-input
                type="text"
                v-model="phone"
                id="input-none"
                pattern="\d{10}"
                title="Please enter 10 digit mobile no."
                :state="null"
                placeholder="Enter Cadre Name"
                required
              ></b-form-input>
            </b-col>

            <b-col sm="6">
              <label for="input-none">Manager Name:</label>

              <b-form-input
                type="text"
                v-model="Password"
                id="input-none"
                :state="null"
                placeholder="Enter Manager Name "
                required
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="6">
              <label for="input-none">Sales Area:</label>

              <b-form-input
                type="text"
                v-model="phone"
                id="input-none"
                
                :state="null"
                placeholder="Enter Sales Area"
                required
              ></b-form-input>
            </b-col>

            <b-col sm="6">
              <label for="input-none">Addres:</label>

              <b-form-input
                type="text"
                v-model="Addres"
                id="input-none"
                :state="null"
                placeholder="Enter Addres"
                required
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <!-- <b-col sm="6">
              <label for="input-none">Company ID:</label>

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
            </b-col> -->
          </b-row>
          
        </b-card>
      </b-col>
      </form>
    </b-container>
 
</template>
<style></style>
<script>
import ApiExecute from "@/api";

export default {
  name: "CreateAdviser",
  data() {
    return {
      add_name: "",
      email: "",
      phone: "",
      company_id: "",
      companys: [],
      Password: "",
      loading: false,
    };
  },
  methods: {
    async add_user() {
      let formData = new FormData();
      formData.append("add_name", this.add_name);
      formData.append("email", this.email);
      formData.append("phone", this.phone);
      // formData.append('aadhar_no', this.aadhar_no);
      formData.append("company_id", this.company_id);
      formData.append("Password", this.Password);

      this.loading = true;
      let apiResponse = await ApiExecute("user", "POST", {
        data: formData,
      });
      this.loading = false;

      if (apiResponse.status) {
        this.$toast.success(`user added successfully`);
        this.resetData();
        this.$router.push({
          name: "CreateUser",
        });
      } else {
        this.$toast.error(`data not saved`);
      }
    },
    async getCompany() {
      this.loading = true;
      let apiResponses = await ApiExecute(`company`);
      this.loading = false;

      if (apiResponses.status) this.companys = apiResponses.data.data;
    },
    resetData: function () {
      this.add_name = "";
      this.email = "";
      this.phone = "";
      this.company_id;
      ("");
      this.companys = [];
      this.Password = "";
    },
  },
  mounted() {
    

    this.getCompany();
  },
};
</script>
