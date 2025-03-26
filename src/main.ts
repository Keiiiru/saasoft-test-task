import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const vuetify = createVuetify({
  components,
  directives,
});

const Pinia = createPinia();
Pinia.use(piniaPluginPersistedstate);

createApp(App).use(vuetify).use(Pinia).mount("#app");
