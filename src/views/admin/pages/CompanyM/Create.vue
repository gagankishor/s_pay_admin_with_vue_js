<template>
  <b-container fluid>
    <form method="post" ref="form" @submit.prevent="add_company">
      <div class="d-flex justify-content-between align-items-center mb-5">
        <h4 class="mb-6">Add Company</h4>
        <b-button type="submit" class="px-5" variant="success"> Save </b-button>
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

  methods: {
    updateForm(form) {
      console.log("form", form);
      this.form = form;
    },

    async add_company() {
      let formData = new FormData();

      for (const key in this.form) {
        formData.append(key, this.form[key]);
      }

      this.loading = true;
      let apiResponse = await ApiExecute("company", "POST", {
        data: formData,
      });
      this.loading = false;

      if (apiResponse.status) {
        console.log(apiResponse.status);
        this.$toast.success(`company added successfully`);
        this.resetData();
        // this.$router.push({
        //             name: 'ViewUser'
        //         })
      } else if (!apiResponse.status) {
        this.$toast.error(`Enter some data `);
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
