import { BootstrapVue3 } from "bootstrap-vue-3";
import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./routes";

// Import bootstrap styles
import "bootstrap/scss/bootstrap.scss";
import Toaster from "@incuca/vue3-toaster";


const app = createApp(App);
router.beforeEach((to, from, next) => {

    if(to.meta?.middleware === 'auth') {

        let token = sessionStorage.getItem("_token")
        let admin = sessionStorage.getItem("_admin")

        if(!token || !admin) {
            next("/admin-xpanel/login");
        }

    }

    next();
})
app.use(router);
app.use(BootstrapVue3);
app.use(Toaster)

app.mount("#app");
