import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import App from './App.vue';
import '@/shared/assets/fonts/avenir/stylesheet.css';
import '@/shared/assets/css/style.css';
import '@/shared/assets/css/normalize.css';
import VueAwesomePaginate from "vue-awesome-paginate";

const pinia = createPinia();
const app = createApp(App).use(pinia).use(router).use(VueAwesomePaginate);
app.mount('#app');