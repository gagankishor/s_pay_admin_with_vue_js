<template>
  <div id="wrapper">
    <section class="login-form">
      <div class="text-center mb-3">
        <h1>Sign In</h1>
        <p>Please login to your account</p>
      </div>
      <b-form method="post" @submit.prevent="doLogin()">

        <div v-if="error" style="color: red">{{ error }}</div>
        <b-form-group label="Username">
          <b-form-input type="text" v-model="username" placeholder="Enter Username" />
        </b-form-group>
        <b-form-group label="Password">
          <b-form-input type="password" v-model="password" placeholder="Enter Password" />
        </b-form-group>
        <div class="d-grid">
          <b-button size="lg" type="submit" variant="dark">Login</b-button>
        </div>
      </b-form>
    </section>
    <section class="bg-dark flex-fill banner-section">
      <div>
        <b-img
          src="https://cdni.iconscout.com/illustration/premium/thumb/user-showing-user-login-page-in-website-or-application-1886527-1597938.png" />
      </div>
    </section>
  </div>
</template>
<script>
import ApiExecute from '@/api';

export default {
  name: 'AdminLogin',
  data() {
    return {
      username: '',
      password: '',
      error: null
    }
  },
  methods: {
    async doLogin() {
      let data = new FormData();
      data.append('email', this.username);
      data.append('password', this.password);

      let apiResponse = await ApiExecute("login", "POST", {
        data,
        nosecure: true
      })

      if (apiResponse.status) {

        sessionStorage.setItem("_token", apiResponse.data.api_token)
        sessionStorage.setItem("_admin", JSON.stringify(apiResponse.data))

        this.$router.push({
          name: 'AdminDashboard'
        });
      } else {
        this.error = apiResponse.error.message
      }

    }
  }
}
</script>
<style lang="scss">
#wrapper {
  height: 100vh;
  display: flex;

  .login-form {
    padding: 60px;
    width: 40%;
    align-self: center;
  }

  .banner-section {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>

