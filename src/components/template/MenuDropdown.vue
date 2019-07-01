<template>
  <div class="menu-dropdown">
    <div class="menu-button">
      <div class="menu-dropdown-img">
        <div class="menu-menu"> <i class="fa fa-bars"></i></div>
      </div>
    </div>
    <div class="menu-dropdown-content">
      <a href @click.prevent="navigate('/admin/users')">
        <i class="fa fa-users"></i> Usuários
      </a>
      <a href @click.prevent="navigate('/admin/divisions')">
        <i class="fa fa-sitemap"></i> Unidades
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuDropdown",
  methods: {
    navigate(link) {
      this.$router.push(link);
    }
  }
};
</script>

<style>
</style>
