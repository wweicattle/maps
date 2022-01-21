import { createApp } from 'vue'
import App from './App.vue'
import { Button ,Collapse,Empty, CollapseItem,Icon,Search } from 'vant';
// vant桌面端使用
import '@vant/touch-emulator';


let app=createApp(App);
app.use(Search).use(Button).use(Collapse).use(CollapseItem).use(Icon).use(Empty);
app.mount('#app');
