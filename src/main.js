import App from "./App.vue";
import "@vuepic/vue-datepicker/dist/main.css";


// Composables
import {
  createApp
} from "vue";

// Plugins
import {
  registerPlugins
} from "@/plugins";

const app = createApp(App);
registerPlugins(app);
app.mount("#app");
