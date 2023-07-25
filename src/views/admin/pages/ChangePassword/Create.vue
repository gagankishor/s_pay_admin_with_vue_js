<template>
    <h1>Change Password</h1>

    <div v-if="loading">
        Loading
    </div>
    <div class="my-4">
        <b-container>
            <form method="post" @submit.prevent="add_type" v-if="!loading">
                <b-row class="">

                    <b-col sm="6">
                        <b-form-group label="Old password">
                            <b-form-input type="text" v-model="old_password" placeholder="Old password" />
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row class="">
                    <b-col sm="6">
                        <b-form-group label="New password">
                            <b-form-input type="text" v-model="new_password" placeholder="New password" />
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row class="">
                    <b-col sm="6">
                        <b-form-group label="Confirm Password">
                            <b-form-input type="text" v-model="confirm_password" placeholder="Confirm Password" />
                        </b-form-group>
                    </b-col>

                </b-row>
                <!-- <button type="submit">Submit</button> -->

                <b-button type="submit" variant="success">ok.sub</b-button>

            </form>
        </b-container>

    </div>

</template>
<style>

</style>
<script>
import ApiExecute from '@/api';

export default {
    name: 'ChangePassword',
    data() {
        return {
            old_password: '',
            new_password: '',
            confirm_password: '',
            loading: false
        }
    },
    methods: {

        async add_type() {
            let formData = new FormData();
            formData.append('old_password', this.old_password);
            formData.append('new_password', this.new_password);
            formData.append('confirm_password', this.confirm_password);



            this.loading = true;
            let apiResponse = await ApiExecute("changepassword", "POST", {
                data: formData
            });
            this.loading = false;

            if (apiResponse.status) {
                this.$router.push({
                    name: 'ChangePassword'
                })
                this.$toast.success(`Password Changed`);
                this.resetData();

            }
            else{
                this.$toast.error(`Password NOT Changed`);

            }
        },
        resetData : function () {
            this.old_password= '';
            this.new_password= '';
            this.confirm_password= '';
            
        },
    }
}
</script>