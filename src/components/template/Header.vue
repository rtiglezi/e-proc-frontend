<template>
  <header class="header">
    <a class="toggle" @click="toggleMenu" v-if="!hideToggle">
      <i class="fa fa-lg" :class="icon"></i>
    </a>

    <h1 class="title">
      <router-link to="/">{{ title }}</router-link>
    </h1>

    <UserDropdown v-if="!hideUserDropdown"/>
  </header>
</template>

<script>
import UserDropdown from "./UserDropdown";

export default {
  name: "Header",
  components: { UserDropdown },
  props: {
    title: String,
    hideToggle: Boolean,
    hideUserDropdown: Boolean
  },
  computed: {
    icon() {
      return this.$store.state.isMenuVisible
        ? "fa fa-folder-open-o"
        : "fa fa-folder-o";
    }
  },
  methods: {
    toggleMenu() {
      this.$store.commit("toggleMenu");
    }
  }
};
</script>

<style>
.header {
  grid-area: header;
 
  display: flex;
  justify-content: ri;
  align-items: center;

 background-image: linear-gradient( to bottom, #232F3E 92%,  #E38C2E 8% );
}

.title {
  font-size: 1.3rem;
  color: white;
  font-weight: bold;
  flex-grow: 1;
  text-align: left;
  margin-left: 10px;
}

.title a {
  color: white;
  text-decoration: none;
}

.title a:hover {
  color: white;
  text-decoration: none;
}

header.header > a.toggle {
  width: 60px;
  height: 100%;
  color: white;
  justify-self: flex-start;
  text-decoration: none;

  display: flex;
  justify-content: center;
  align-items: center;
}

header.header > a.toggle:hover {
  color: white;
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
