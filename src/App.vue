<template>
  <div id="app" :class="{'hide-menu': !isMenuVisible || !user}">
    <Header title="[e-Proc 2]" :hideToggle="!user" :hideUserDropdown="!user"/>
    <Menu v-if="user" />
		<Loading v-if="validatingToken" />
		<Content v-else />
		<Footer />
  </div>
</template>


<script>
import { userKey } from "@/global";
import { mapState } from "vuex";
import Header from "@/components/template/Header";
import Menu from "@/components/template/Menu";
import Content from "@/components/template/Content";
import Footer from "@/components/template/Footer";
import Loading from "@/components/template/Loading"

export default {
  name: "App",
  components: { Header, Menu, Content, Footer, Loading },
  computed: mapState(["isMenuVisible", "user"]),
  data: function() {
    return {
      validatingToken: true
    };
  },
  methods: {
    async validateToken() {
      this.validatingToken = true;

      const json = localStorage.getItem(userKey);

      const userData = JSON.parse(json);
      this.$store.commit("setUser", null);

      if (!userData) {
        this.validatingToken = false;
        localStorage.removeItem(userKey);
        this.$router.push({ name: "auth" });
      } else {
        this.$store.commit("setUser", userData);
      }

      this.validatingToken = false;
    }
  },
  created() {
    this.validateToken();   
  }
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

.adm-box {
  background-color: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
}
.adm-box-ico {
  color: rgba(255, 255, 255, 0.5);
  text-align: center;
}
.adm-box-table {
  color: #222;
}
.adm-msg-error {
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
.adm-btn-main {
  background-color: white;
  color: #39485c;
}
.adm-btn-main:hover {
  background-color: darkorange;
  color: white;
}
.adm-table-th {
  background-color: #46505c;
  color: white;
}
</style>

