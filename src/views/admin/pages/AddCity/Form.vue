<template>
  <b-row>
    <b-col cols="4">
      <b-card>
        <form method="post" @submit="add_city" v-if="!loading">
          <b-row class="my-1">
            <b-col sm="3">
              <label for="input-none">STATE:</label>
            </b-col>
            <b-col sm="9">
              <select v-model="state_id" class="form-select" required>
                <option value="">SELECT STATE</option>

                <option
                  v-for="state in states"
                  :value="state.id"
                  :key="state.id"
                >
                  {{ state.name }}
                </option>
              </select>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="3">
              <label for="input-none">CITY:</label>
            </b-col>
            <b-col sm="9">
              <b-form-input
                type="text"
                v-model="name"
                id="input-none"
                :state="null"
                placeholder="CITY NAME"
                required
              ></b-form-input>
            </b-col>
          </b-row>

          <b-button class="btform" type="submit" variant="success"
            >ADD CITY</b-button
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
      
      form: {
        state_id: "",
        name: "",
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
