<template>
  <header class="header">
    <MenuDropdown v-if="!hideUserDropdown" />

    <span class="title">
      <MenuLogo v-if="!hideUserDropdown" />
    </span>

    <UserDropdown v-if="!hideUserDropdown" />
  </header>
</template>

<script>
import UserDropdown from "./UserDropdown";
import MenuDropdown from "./MenuDropdown";
import MenuLogo from "./MenuLogo";

export default {
  name: "Header",
  components: { UserDropdown, MenuDropdown, MenuLogo },
  props: {
    title: String,
    hideToggle: Boolean,
    hideUserDropdown: Boolean
  },
  methods: {
    navigate(link) {
      this.$router.push(link);
    }
  }
};
</script>

<style>
.header {
  grid-area: header;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(to bottom, #232f3e 92%, #e38c2e 8%);
}

.title {
  flex-grow: 1;
  text-align: left;
  height: 60px;
}

.menu-dropdown {
  position: relative;
  height: 100%;
}

.menu-button {
  display: flex;
  align-items: center;
  color: #fff;
  font-weight: 100;
  height: 100%;
  padding: 0px 10px;
}

.menu-dropdown:hover {
  background-color: rgba(0, 0, 0, 0.2);
}

.menu-dropdown-img {
  margin: 0px 10px;
}

.menu-dropdown-img > img {
  max-height: 37px;
  border-radius: 5px;
}

.menu-dropdown-content {
  position: absolute;
  background-color: #f9f9f9;
  min-width: 170px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 10px;
  z-index: 1;

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  visibility: hidden;
  opacity: 0;
  transition: visibility 0s, opacity 0.5s linear;
}

.menu-dropdown:hover .menu-dropdown-content {
  visibility: visible;
  opacity: 1;
}

.menu-dropdown-content a {
  text-decoration: none;
  color: #000;
  padding: 10px;
}

.menu-dropdown-content a:hover {
  text-decoration: none;
  color: #000;
  background-color: #ededed;
}

.avatar {
  width: 35px;
  height: 35px;
  background-color: rgba(255, 255, 255, 0.158);
  color: rgba(255, 255, 255, 0.774);
  border-radius: 50px;
  text-align: center;
  font-size: 22px;
}
.menu-menu {
  color: rgba(255, 255, 255, 0.774);
  text-align: center;
  font-size: 22px;
}
.menu-logo {
  color: white;
  text-align: center;
  font-size: 22px;
}
</style>
