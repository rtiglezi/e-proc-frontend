<template>
  <div class="header">
    <b-navbar toggleable="lg" type="dark" class="header-nav">
      <b-navbar-brand href="#" class="header-title">[e-Proc2]</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item-dropdown text="Processos">
            <b-dropdown-item href="#">Cadastrar</b-dropdown-item>
            <b-dropdown-item href="#">Estatísticas</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

        <b-navbar-nav>
          <b-nav-item-dropdown text="Administração">
            <b-dropdown-item href="#" @click="navigate('/admin/users')">
              <i class="fa fa-users mr-1" style="color:orange"></i>Usuários
            </b-dropdown-item>
            <b-dropdown-item href="#" @click="navigate('/admin/divisions')">
              <i class="fa fa-sitemap mr-1" style="color:orange"></i>Unidades
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form class="mr-5">
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button variant="dark" size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template slot="button-content">
              <i class="fa fa-user mr-1" style="color:orange"></i>
              {{ user.name }}
            </template>
            <b-dropdown-item href="#" @click="logout()">
              <i class="fa fa-sign-out" style="color:#555"></i> Sair
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { userKey } from "@/global";
import { mapState } from "vuex";
export default {
  name: "Header",
  components: {},
  computed: mapState(["user"]),
  props: {
    title: String,
    hideToggle: Boolean,
    hideUserDropdown: Boolean
  },
  methods: {
    navigate(link) {
      this.$router.push(link);
    },
    logout() {
      localStorage.removeItem(userKey);
      this.$store.commit("setUser", null);
      this.$router.push({ name: "auth" });
    }
  }
};
</script>

<style>
.header {
  background-color: #ccc;
}
.header-nav {
  z-index: 2;
  background-color: #006999;
}
.header-title {
  font-weight: bold;
}
</style>
