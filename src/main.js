import { createApp } from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Translations from '@/mixins/Translations';

const app = createApp(App);
app.use(router);
app.use(store);
app.mixin(Translations);
app.mount("#app");
