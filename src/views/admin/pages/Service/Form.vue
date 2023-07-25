<template>
  <b-row>
    <b-col sm="8" lg="6">
      <b-card header="Services Details">
        <b-row>
          <b-col sm="6" class="mb-3">
            <label for="input-none" class="form-label">TITLE :</label>

            <b-form-input
              type="text"
              v-model="title"
              id="input-none"
              :state="Number"
              placeholder="TITLE"
              required
            />
          </b-col>

          <b-col sm="6" class="mb-3">
            <label for="input-none" class="form-label">SLUG :</label>

            <b-form-input
              type="text"
              v-model="slug"
              id="input-none"
              :state="Number"
              placeholder="SLUG"
              required
            />
          </b-col>

          <b-col sm="12" class="mb-3">
            <label for="input-none" class="form-label">DESCRIPTION :</label>

            <b-form-textarea
              type="massege"
              v-model="description"
              id="input-none"
              :state="Number"
              placeholder="DESCRIPTION"
              required
            />
          </b-col>
        </b-row>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>

export default {
  name: "ServiceForm",
  props: ["formField"],
  data() {
    return {
      citys: [],
      form: {
        title: "",
        slug: "",
        description: "",
        

      },
    };
  },
  async mounted() {
    // console.log("cities: ", this.citys, this.form);
    this.getCities();
    

    
  },
  methods: {
    
    
    
    setForm(field, value) {
      this.form[field] = value

      this.$emit('updateForm', this.form)
    }
  },
  watch: {
    "form.title" () {
      this.setForm("title", this.form.title)
    },
      "form.slug" () {

      this.setForm("slug", this.form.slug)
      },
      "form.description" () {

      this.setForm("description", this.form.description)
    },
    
  }
};
</script>
