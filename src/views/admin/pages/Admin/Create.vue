<template>
    <h1>ADD USER</h1>

    <div v-if="loading">
        Loading
    </div>
    <div class="my-4">
        <b-container>
            <form method="post" @submit="add_type" v-if="!loading">
                <b-row>
                    <b-col sm="6">
                <b-container fluid>
                    <b-row class="my-1">
                      <b-col sm="3">
                        <label for="input-none">Name:</label>
                      </b-col>
                      <b-col sm="9">
                        <b-form-input type="text" v-model="name" id="input-none" :state="null" placeholder="Name" required></b-form-input>
                      </b-col>
                    </b-row>
                    <b-row class="my-1">
                        <b-col sm="3">
                          <label for="input-none">Email:</label>
                        </b-col>
                        <b-col sm="9">
                          <b-form-input type="email" v-model="email" id="input-none" :state="null" placeholder="Email" required></b-form-input>
                        </b-col>
                      </b-row>
                      <b-row class="my-1">
                        <b-col sm="3">
                          <label for="input-none">Phone:</label>
                        </b-col>
                        <b-col sm="9">
                          <b-form-input type="number" v-model="phone" id="input-none" :state="null" placeholder="Phone" required></b-form-input>
                        </b-col>
                      </b-row>
                      
                      
                      
                      <b-row class="my-1">
                        <b-col sm="3">
                          <label for="input-none">Password:</label>
                        </b-col>
                        <b-col sm="9">
                          <b-form-input type="password" v-model="Password" id="input-none" :state="null" placeholder="Password" required></b-form-input>
                        </b-col>
                      </b-row>
                      <b-row class="my-1">
                        <b-col sm="3">
                          <label for="input-none">Company ID:</label>
                        </b-col>
                        <b-col sm="9">
                          <select v-model="company_id" class="form-select" required>
                            <option value="">COMPANY NAME</option>
                            
                            <option v-for="company in companys" :value="company.id" :key="company.id">{{
                                company.name
                            }}
                            </option>
                        </select>                        </b-col>
                      </b-row>
                </b-container>
                <!-- <b-col sm="4">
                  <b-form-group class="mt-4" label="COMPANY NAME">
                      <select v-model="company_id" class="form-select" required>
                          <option value="">COMPANY NAME</option>
                          
                          <option v-for="company in companys" :value="company.id" :key="company.id">{{
                              company.name
                          }}
                          </option>
                      </select>
                  </b-form-group>
              </b-col> -->
                <!-- <b-row class="">

                    <b-col sm="6">
                        <b-form-group label="Name">
                            <b-form-input type="text" v-model="add_name" placeholder="Name" required/>
                        </b-form-group>
                    </b-col>
                    <b-col sm="6">
                        <b-form-group label="Email">
                            <b-form-input type="email" v-model="email" placeholder="Email"  required/>
                        </b-form-group>
                    </b-col>
                    <b-col sm="6">
                        <b-form-group label="Phone">
                            <b-form-input type="tel" v-model="phone" placeholder="Phone" required/>
                        </b-form-group>
                    </b-col>
                    
                    <b-col sm="6">
                        <b-form-group label="Company ID">
                            <b-form-input type="text" v-model="company_id" placeholder="Company ID" required/>
                        </b-form-group>
                    </b-col>
                     <b-col sm="6">
                        <b-form-group label="Password">
                            <b-form-input type="password" v-model="Password" placeholder="password" autocomplete="off" required/>
                        </b-form-group>
                    </b-col>
                </b-row> -->
                <!-- <button type="submit">Submit</button> -->

                        <b-button type="submit" variant="success">ADD USER</b-button>
                    </b-col>     
                </b-row>
            </form>
        </b-container>

    </div>

</template>
<style>

</style>
<script>
import ApiExecute from '@/api';

export default {
    name: 'CreateAdmin',
    data() {
        return {
            name: '',
            email: '',
            phone: '',
            company_id: '',
            companys:[],
            Password: '',
            loading: false
        }
    },
    methods: {

        async add_type() {
            let formData = new FormData();
            formData.append('name', this.name);
            formData.append('email', this.email);
            formData.append('phone', this.phone);
            // formData.append('aadhar_no', this.aadhar_no);
            formData.append('company_id', this.company_id);
            formData.append('Password', this.Password);

            this.loading = true;
            let apiResponse = await ApiExecute("admin", "POST", {
                data: formData
            });
            this.loading = false;

            if (apiResponse.status)
            console.log(apiResponse.status);
            {
                this.$router.push({
                    name: 'CreateUser'
                })
            }
        },
        async getCompany() {
            this.loading = true
            let apiResponses = await ApiExecute(`company`);
            this.loading = false
         
            if (apiResponses.status)
                this.companys = apiResponses.data.data
        },
    },
    mounted() {
        //this.fetchTypes()
        
        this.getCompany()
    },
}
</script>