import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import "./assets/main.css";
import "primeicons/primeicons.css";
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import i18n from "./i18n";
import route from "./routes";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(i18n);
app.use(route);
app.mount("#app");
