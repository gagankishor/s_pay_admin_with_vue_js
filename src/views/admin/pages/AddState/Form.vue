<template>
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
