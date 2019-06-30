<template>
  <div id="app" :class="{'hide-menu': !isMenuVisible || !user}">
    <Header title="[e-Proc 2]" :hideToggle="!user" :hideUserDropdown="!user"/>
    <Menu v-if="user"/>
    <Content/>
    <Footer/>
  </div>
</template>


<script>
import { mapState } from "vuex";
import Header from "@/components/template/Header";
import Menu from "@/components/template/Menu";
import Content from "@/components/template/Content";
import Footer from "@/components/template/Footer";

export default {
  name: "App",
  components: { Header, Menu, Content, Footer },
  computed: mapState(["isMenuVisible", "user"])
};
</script>

<style>
* {
  font-family: "Lato", sans-serif;
}

body {
  margin: 0;
}


#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  height: 100vh;
  display: grid;
  grid-template-rows: 60px 1fr 20px;
  grid-template-columns: 200px 1fr;
  grid-template-areas:
    "header header"
    "menu content"
    "menu footer";
}

#app.hide-menu {
  grid-template-areas:
    "header header"
    "content content"
    "footer footer";
}

#app.hide-menu {
  grid-template-areas:
    "header header"
    "content content"
    "footer footer";
}

.error {
  margin-left: 5px;
  color: #6d630e;
  font-size: 11px;
  font-weight: normal;
  background-color: #fff3cd;
  background-image: url(~@/assets/alert-icon-red.png);
  background-size: 15px 15px;
  background-repeat: no-repeat;
  background-position: 2px;
  padding: 3px;
  border-radius: 5px 5px 5px;
  border: 1px solid #dce0be;
  padding-left: 20px;
  position: relative;
}

.adm-box {
  background-color: #eee;
  color: black;
}
.adm-box-ico {
  color: #72777c;
  text-align: center;
}

</style>

