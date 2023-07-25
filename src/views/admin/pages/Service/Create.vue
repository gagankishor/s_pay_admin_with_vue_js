<template>
  <b-container fluid>
    <form method="post" @submit.prevent="add_type" v-if="!loading">
      <div class="d-flex justify-content-between align-items-center mb-5">
        <h4 class="mb-6">Add Services</h4>
        <b-button type="submit" variant="success">ADD SERVICE</b-button>
      </div>

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
    </form>
  </b-container>
</template>

<script>
import ApiExecute from "@/api";

export default {
  name: "ViewAeps",
  data() {
    return {
      title: "",
      slug: "",
      description: "",
      loading: false,
      limit: 8,
      search: "",
    };
  },

  methods: {
    async add_type() {
      let formData = new FormData();
      formData.append("title", this.title);
      formData.append("slug", this.slug);
      formData.append("description", this.description);

      this.loading = true;
      let apiResponse = await ApiExecute("service", "POST", {
        data: formData,
      });

      this.loading = false;

      if (apiResponse.status) {
        this.$toast.success(`service added successfully`);
        this.resetData();
      } else {
        this.$toast.error(`title alredy resisterd`);
      }
    },
    resetData: function () {
      this.title = "";
      this.slug = "";
      this.description, "";
    },
  },
};
</script>
