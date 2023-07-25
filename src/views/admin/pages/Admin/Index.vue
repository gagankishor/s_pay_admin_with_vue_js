

<template>
    <!-- <div>
        <div v-if="galleries?.data && !galleries?.data?.length">
            No record(s) found.
        </div>

        <div v-if="galleries?.data">
            <div style="display: flex; justify-content: space-between;margin:50px 0 20px 0">
                <div>
                    <select v-model="limit" id="">
                          <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </div>
             
            </div>
            <div v-if="loading">
                Loading
            </div>
            <div class="table-responsive" v-if="galleries?.data?.length && !loading">

                <view-table :items="galleries.data" :headers="columns" :from="galleries.from" />
                 <EasyDataTable :headers="columns" :items="galleries"></EasyDataTable> -->
                <!-- <pagination :data="galleries" @pagination-change-page="fetchTypes" />
            </div>
        </div>

    </div> --> 


    <div>
      <b-form @submit.stop.prevent="onSubmit">
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
  
        <b-form-group id="example-input-group-2" label="Food" label-for="example-input-2">
          <b-form-select
            id="example-input-2"
            name="example-input-2"
            v-model="form.food"
            v-validate="{ required: true }"
            :options="foods"
            :state="validateState('example-input-2')"
            aria-describedby="input-2-live-feedback"
            data-vv-as="Food"
          ></b-form-select>
  
          <b-form-invalid-feedback id="input-2-live-feedback">{{ veeErrors.first('example-input-2') }}</b-form-invalid-feedback>
        </b-form-group>
  
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button class="ml-2" @click="resetForm()">Reset</b-button>
      </b-form>
    </div>
  </template>
  
  <style>
  body {
    padding: 1rem;
  }
  </style>
  
  <script>
  export default {
    name: 'ViewAdmin',
    data() {
      return {
        foods: [
          { value: null, text: "Choose..." },
          { value: "apple", text: "Apple" },
          { value: "orange", text: "Orange" }
        ],
        form: {
          name: null,
          food: null
        }
      };
    },
    methods: {
      validateState(ref) {
        if (
          this.veeFields[ref] &&
          (this.veeFields[ref].dirty || this.veeFields[ref].validated)
        ) {
          return !this.veeErrors.has(ref);
        }
        return null;
      },
      resetForm() {
        this.form = {
          name: null,
          food: null
        };
  
        this.$nextTick(() => {
          this.$validator.reset();
        });
      },
      onSubmit() {
        this.$validator.validateAll().then(result => {
          if (!result) {
            return;
          }
  
          alert("Form submitted!");
        });
      }
    }
  };
  



// import ApiExecute from '@/api';
// import moment from "moment"

// // import Vue3EasyDataTable from 'vue3-easy-data-table';
// // import 'vue3-easy-data-table/dist/style.css';
// import VuePaginate from 'vue-paginate'

// import ViewTable from '../../components/ViewTable.vue';


// export default {
//     name: 'ViewAdmin',
//     components: {
//         "Pagination": VuePaginate,
//         ViewTable
//     },
//     data() {
//         return {
//             galleries: null,
//             columns: [
//                 { text: 'name', value: 'add_name' },
//                 { text: 'email', value: 'email' },
//                 { text: 'phone', value: 'phone' },
//                 //{ text: 'company_id', value: 'company_id' },
//                 // { text: 'Password', value: 'Password' },
                
//             ],
//             loading: false,
//             limit: 10,
//             search: ''
//         }
//     },

//     mounted() {
//         this.fetchTypes()
//     },

//     methods: {
//         formatDate(value) {
//             if (value) {
//                 return moment(String(value)).format('DD-MMM-YYYY hh:mm:ss')
//             }
//         },
//         async fetchTypes(page = 1) {
//             this.loading = true
//             let apiResponse = await ApiExecute(`admin/?page=${page}&limit=${this.limit}&search=${this.search}`);
//             this.loading = false
//             if (apiResponse.status)
//                 this.galleries = apiResponse.data
//         }
//     },
//     watch: {
//         search() {
//             this.fetchTypes(1)
//         },
//         limit() {
//             this.fetchTypes(1)
//         }
//     }
// }
</script>