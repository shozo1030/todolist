require('./bootstrap');

import { createApp } from 'vue'
import App from './vue/app'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Toaster from '@meforma/vue-toaster';

library.add(fas)

export const eventBus = createApp(App)
createApp(App)
    .component("font-awesome-icon", FontAwesomeIcon)
    .use(Toaster)
    .mount('#app');
