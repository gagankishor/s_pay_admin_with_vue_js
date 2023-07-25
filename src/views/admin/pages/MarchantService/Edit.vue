<template>
  <b-container fluid>
    <form method="post" ref="form" @submit.prevent="updateCompany" v-if="!loading">
      <div class="d-flex justify-content-between align-items-center mb-5">
        <h4 class="mb-6">Edit Company</h4>
        <b-button type="submit" class="px-5" variant="success">
          Update
        </b-button>
      </div>

      <div v-if="loading">Loading</div>
      <template v-else>
        <company-form @updateForm="updateForm" />
      </template>
    </form>
  </b-container>
</template>
<script>
import ApiExecute from "@/api";

import CompanyForm from "./Form.vue";

export default {
  name: "CreateBank",
  components: { CompanyForm },
  data() {
    return {
      form: {
        domain: "",
        name: "",
        email: "",
        phone: "",
        logo: null,
        licence: "",
        city_id: "",
      },     
      loading: false,
      search: "",
    };
  },

  mounted() {
    this.fetchCompanyById(this.$route.params.id)
  },

  methods: {

    fetchCompanyById: async (id) => {
      let apiResponse = await ApiExecute(`company/${id}`)

      console.log('api ka response company: ', apiResponse);
    },
    updateForm(form) {
      console.log("form", form);
      this.form = form;
    },


    async updateCompany() {
      let id  = this.$route.params?.id

      let formData = new FormData();
      formData.append('_method', 'PUT');
      for (const key in this.form) {
        formData.append(key, this.form[key]);
      }
      // formData.append("_method", "PUT")
      // formData.append("domain", this.domain);
      // formData.append("name", this.name);
      // formData.append("email", this.email);
      // formData.append("phone", this.phone);
      // formData.append("logo", this.$refs.fileInput.files[0]);
      // formData.append("licence", this.licence);
      // formData.append("city_id", this.city_id);

      this.loading = true;
      let apiResponse = await ApiExecute(`company/${id}`, "POST", {
        data: formData,
      });
      this.loading = false;

      if (apiResponse.status) {
        this.$router.push({
          name: "CreateBank",
        });
        this.$toast.success(`company added successfully`);

        
        // this.resetData();
      } else {
        this.$toast.error(`DOMAIN NAME alredy resiterd`);
      }
    },

    

    resetData: function () {
      this.domain = "";
      this.name = "";
      this.email = "";
      this.phone = "";
      this.logo = "";
      this.licence = "";
      this.city_id = "";
      this.citys = [];
    },
  },
};
</script>
