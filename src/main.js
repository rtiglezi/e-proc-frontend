import "font-awesome/css/font-awesome.css";

import store from "./config/store";
import router from "./config/router";
import "./config/bootstrap";
import "./config/msgs";

import App from "./App";

import Vue from "vue";
import VeeValidate from "vee-validate";

import pt_BR from 'vee-validate/dist/locale/pt_BR';

Vue.use(VeeValidate, {
  locale: 'pt_BR',
  dictionary: {
    pt_BR: pt_BR
  }
});


Vue.config.productionTip = false;


new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
