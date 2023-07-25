<template>
  <b-container fluid>
    <form method="post" ref="form" @submit.prevent="updateCompany" v-if="!loading">
      <div class="d-flex justify-content-between align-items-center mb-5">
        <h4 class="mb-6">Edit Service</h4>
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
        title: "",
      slug: "",
      description: "",
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
      let apiResponse = await ApiExecute(`service/${id}`)

      console.log('api ka response company: ', apiResponse);
    },
    updateForm(form) {
      console.log("form", form);
      this.form = form;
    },

    async updateCompany() {
      let id  = this.$route.params?.id

      let formData = new FormData();
      formData.append("_method", "PUT")
      formData.append("title", this.title);
      formData.append("slug", this.slug);
      formData.append("discription", this.description);
     

      this.loading = true;
      let apiResponse = await ApiExecute(`service/${id}`, "POST", {
        data: formData,
      });
      this.loading = false;

      if (apiResponse.status) {
        this.$router.push({
          name: "ViewAeps",
        });
        this.$toast.success(`company updated successfully`);
        this.resetData();
      } else {
        this.$toast.error(`DOMAIN NAME alredy resiterd`);
      }
    },

   
    resetData: function () {
      this.title = "";
      this.slug = "";
      this.description = "";
      
    },
  },
};
</script>

