import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";


// import "~/styles/element/index.scss";

// import ElementPlus from "element-plus";
// import all element css, uncommented next line
// import "element-plus/dist/index.css";

// or use cdn, uncomment cdn link in `index.html`

import "~/styles/index.scss";
import 'uno.css'

// If you want to use ElMessage, import it.
import "element-plus/theme-chalk/src/message.scss"

// 5. 创建并挂载根实例
const app = createApp(App);
// app.use(ElementPlus);
app.use(router) //确保 _use_ 路由实例使 整个应用支持路由。
app.mount("#app");
