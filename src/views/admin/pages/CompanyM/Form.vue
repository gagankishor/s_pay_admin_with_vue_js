<template>
  <b-row>
    <b-col sm="8" lg="9">
      <b-card header="Basic Information">
        <b-row class="my-1">
          <b-col sm="6" class="mb-3">
            <label for="input-none" class="form-label">NAME:</label>

            <b-form-input
              type="text"
              v-model="form.name"
              id="input-none"
              :state="null"
              placeholder="NAME"
              required
            ></b-form-input>
          </b-col>
          <b-col sm="6" class="mb-3">
            <label for="input-none" class="form-label">DOMAIN:</label>

            <b-form-input
              type="text"
              v-model="form.domain"
              id="input-none"
              :state="null"
              placeholder="DOMAIN"
              required
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="6" class="mb-3">
            <label for="input-none" class="form-label">Email:</label>

            <b-form-input
              type="email"
              v-model="form.email"
              id="input-none"
              :state="null"
              placeholder="Email"
              required
            ></b-form-input>
          </b-col>

          <b-col sm="6" class="mb-3">
            <label for="input-none1" class="form-label">Phone:</label>

            <b-form-input
              type="text"
              v-model="form.phone"
              id="input-none1"
              :state="null"
              pattern="\d{10}"
              title="Please enter 10 digit mobile no."
              placeholder="Phone"
              required
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="6" class="mb-3">
            <label for="input-none2" class="form-label">LICENCE:</label>

            <b-form-input
              type="text"
              v-model="form.licence"
              id="input-none2"
              :state="null"
              placeholder="LICENCE"
              required
            ></b-form-input>
          </b-col>

          <b-col sm="6" class="mb-3">
            <label for="input-none" class="form-label">CITY:</label>

            <b-form-select
              v-model="form.city_id"
              :options="options"
              placeholder="CITY"
            >
              <option value="">Select City</option>
              <option
                v-for="city in citys"
                :value="city.id"
                :key="city.id"
                required
              >
                {{ city.name }}
              </option>
            </b-form-select>
          </b-col>
        
        </b-row>
        <b-row class="my-1">
          <b-col sm="6" class="mb-3">
            <label for="input-none" class="form-label">Adviser Name:</label>

            <b-form-input
              type="email"
              
              id="input-none"
              :state="null"
              placeholder="Enter Adviser Name"
              required
            ></b-form-input>
          </b-col>

          <b-col sm="6" class="mb-3">
            <label for="input-none1" class="form-label">Adviser Code:</label>

            <b-form-input
              type="text"
           
              id="input-none1"
              :state="null"
              pattern="\d{10}"
              title="Please enter 10 digit code no."
              placeholder="Enter Adviser Code"
              required
            ></b-form-input>
          </b-col>
        </b-row>
      </b-card>
    </b-col>
    <b-col sm="4" lg="3">
      <b-card header="Upload Logo">
        <label for="image" class="d-block upload-image mb-3">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"
            alt=""
            class="img-fluid"
          />
          <input
            type="file"
            ref="fileInput"
            class="bg d-none"
            id="image"
            required
            @change="uploadfile"
          />
        </label>
        <label for="image" class="btn btn-primary w-100">CHOOSE IMAGE</label>
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
      citys: [],
      form: {
        domain: "",
        name: "",
        email: "",
        phone: "",
        logo: null,
        licence: "",
        city_id: "",
        

      },
    };
  },
  async mounted() {
    // console.log("cities: ", this.citys, this.form);
    this.getCities();
    

    
  },
  methods: {
    
    async getCities() {
      this.loading = true;
      let apiResponses = await ApiExecute(`city`);

      this.loading = false;
      if (apiResponses.status) {
        // console.log(apiResponses);
        this.citys = apiResponses.data.data;
      }
    },
    uploadfile(event){
      // let file = this.$refs.fileInput.files[0]
      const [file] = event.target.files

      this.form.logo = file;
    },
    setForm(field, value) {
      this.form[field] = value

      this.$emit('updateForm', this.form)
    }
  },
  watch: {
    "form.domain" () {
      this.setForm("domain", this.form.domain)
    },
      "form.name" () {

      this.setForm("name", this.form.name)
      },
      "form.email" () {

      this.setForm("email", this.form.email)
    },
      "form.phone" () {
      this.setForm("phone", this.form.phone)
    },
      "form.logo" () {
      this.setForm("logo", this.form.logo)
    },
      "form.licence" () {
      this.setForm("licence", this.form.licence)
    },
      "form.city_id" () {
      this.setForm("city_id", this.form.city_id)
    }
  }
};
</script>
