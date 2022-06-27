import {createApp} from 'vue'
import * as Vue from 'vue' // in Vue 3
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import './assets/css/icon.css'

import Loading from 'vue3-loading-overlay'
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css'

// CKEditor
import CKEditor from '@ckeditor/ckeditor5-vue'

const app = createApp(App)
installElementPlus(app)
app
    .use(store)
    .use(router)
    .use(VueAxios, axios)
    .use(CKEditor)
    .component('Loading', Loading)
    
    .mount('#app')
   
    