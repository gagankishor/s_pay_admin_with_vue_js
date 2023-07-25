<template>
  <b-row>
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
            </b-col>
          </b-row>          
        </b-card>
      </b-col>    
  </b-row>
</template>

<script>
import ApiExecute from "@/api";

export default {
  name: "CompanyForm",
  props: ["formField"],
  data() {
    return {
      companys: [],
      form: {
        add_name: "",
        email: "",
        phone: "",
        company_id: "",
        Password: "",
        loading: false,
      },
    };
  },
  mounted() {
    this.getCompany();
  },
  methods: {
    // async getCities() {
    //   this.loading = true;
    //   let apiResponses = await ApiExecute(`city`);

    //   this.loading = false;
    //   if (apiResponses.status) {
    //     // console.log(apiResponses);
    //     this.citys = apiResponses.data.data;
    //   }
    // },
    async getCompany() {
      this.loading = true;
      let apiResponses = await ApiExecute(`company`);
      this.loading = false;

      if (apiResponses.status) this.companys = apiResponses.data.data;
    },
    
    setForm(field, value) {
      this.form[field] = value;

      this.$emit("updateForm", this.form);
    },
  },
  watch: {
    "form.add_name"() {
      this.setForm("add_name", this.form.add_name);
    },
    
    "form.email"() {
      this.setForm("email", this.form.email);
    },
    "form.phone"() {
      this.setForm("phone", this.form.phone);
    },
    "form.company_id"() {
      this.setForm("company_id", this.form.company_id);
    },
    "form.Password"() {
      this.setForm("Password", this.form.Password);
    },
    
  },
};
</script>
