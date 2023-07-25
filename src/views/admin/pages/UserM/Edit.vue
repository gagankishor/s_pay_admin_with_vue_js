<template>
  <b-container fluid>
    <form method="post" ref="form" @submit.prevent="updateUser" v-if="!loading">
      <div class="d-flex justify-content-between align-items-center mb-5">
        <h4 class="mb-6">Edit User</h4>
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
        add_name: "",
        email: "",
        phone: "",
        company_id: "",
        Password: "",
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
      let apiResponse = await ApiExecute(`user/${id}`)

      console.log('api ka response company: ', apiResponse);
    },
    updateForm(form) {
      console.log("form", form);
      this.form = form;
    },


    // async updateUser() {
    //   let id  = this.$route.params?.id

    //   let formData = new FormData();
    //   formData.append('_method', 'PUT');
    //   for (const key in this.form) {
    //     formData.append(key, this.form[key]);
    //   }
    //   this.loading = true;
    //   let apiResponse = await ApiExecute(`user/${id}`, "POST", {
    //     data: formData,
    //   });
    //   this.loading = false;

    //   if (apiResponse.status) {
    //     this.$router.push({
    //       name: "CreateBank",
    //     });
    //     this.$toast.success(`company added successfully`);

        
    //     // this.resetData();
    //   } else {
    //     this.$toast.error(`DOMAIN NAME alredy resiterd`);
    //   }
    // },
    async updateUser() {
      
      let id  = this.$route.params?.id

      let formData = new FormData();
      formData.append('_method', 'PUT');
      for (const key in this.form) {
        formData.append(key, this.form[key]);
      }
      this.loading = true;
      let apiResponse = await ApiExecute(`user/${id}`, "POST", {
        data: formData,
      });
      this.loading = false;

      if (apiResponse.status) {
        this.$toast.success(`user added successfully`);
        // this.resetData();
        this.$router.push({
          name: "ViewUser",
        });
      } else {
        this.$toast.error(`data not saved`);
      }
    },

    

    // resetData: function () {
    //   this.domain = "";
    //   this.name = "";
    //   this.email = "";
    //   this.phone = "";
    //   this.logo = "";
    //   this.licence = "";
    //   this.city_id = "";
    //   this.citys = [];
    // },
  },
};
</script>
