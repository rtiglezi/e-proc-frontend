<template>

  <aside class="menu" v-show="isMenuVisible">
    <div id="cssmenu">
      <ul v-if="isAdmin">
        <li>
          <a>
            <span>Adminsitração</span>
          </a>
        </li>
        <li>
          <a href="#" @click="navigate('/admin/users')">
            <span>
              <i class="fa fa-users mr-2"></i>Usuários
            </span>
          </a>
        </li>
        <li>
          <a href="#" @click="navigate('/admin/divisions')">
            <span>
              <i class="fa fa-sitemap mr-2"></i>Unidades
            </span>
          </a>
        </li>
        <li>
          <a href="#">
            <span>
              <i class="fa fa-file mr-2"></i>Pedidos
            </span>
          </a>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script>
import { userKey } from "@/global";
import { mapState } from "vuex";

export default {
  name: "Menu",
  computed: mapState(["isMenuVisible"]),
  data: function() {
    return {
      isAdmin: false
    };
  },
  methods: {
    navigate(link) {
      this.$router.push(link);
    }
  },
  mounted() {
    const json = localStorage.getItem(userKey);
    const user = JSON.parse(json);
    this.isAdmin = user.profiles.indexOf("admin") != -1;
  }
};
</script>

<style>
.menu {
  grid-area: menu;
  background: #686c70;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

/* Some stylesheet reset */
#cssmenu > ul {
  list-style: none;
  margin: 0;
  padding: 0;
  vertical-align: baseline;
  line-height: 1;
}
/* The container */
#cssmenu > ul {
  display: block;
  position: relative;
  width: 200px;
  /* The list elements which contain the links */
}
#cssmenu > ul li {
  display: block;
  position: relative;
  margin: 0;
  padding: 0;
  width: 100%;
}
/* General link styling */
#cssmenu > ul li a {
  /* Layout */

  display: block;
  position: relative;
  margin: 0;
  border-top: 1px dotted #3a3a3a;
  border-bottom: 1px dotted #1b1b1b;
  padding: 11px 20px;
  /* Typography */

  font-family: Helvetica, Arial, sans-serif;
  color: #d8d8d8;
  text-decoration: none;
  text-shadow: 0 1px 1px #000;
  font-size: 13px;
  font-weight: 300;
  /* Background & effects */

  background: rgb(27, 36, 48);
}
/* Rounded corners for the first link of the menu/submenus */
#cssmenu > ul li:first-child > a {
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  border-top: 0;
}
/* Rounded corners for the last link of the menu/submenus */
#cssmenu > ul li:last-child > a {
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: opx;
  border-bottom: 0;
}
/* The hover state of the menu/submenu links */
#cssmenu > ul li > a:hover,
#cssmenu > ul li:hover > a {
  color: #e38c2e;
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3);
  background: rgba(0, 0, 0, 0.7);
  border-color: transparent;
}
/* The arrow indicating a submenu */
#cssmenu > ul .has-sub > a::after {
  content: "";
  position: absolute;
  top: 16px;
  right: 10px;
  width: 0px;
  height: 0px;
  /* Creating the arrow using borders */

  border: 4px solid transparent;
  border-left: 4px solid #d8d8d8;
}
/* The same arrow, but with a darker color, to create the shadow effect */
#cssmenu > ul .has-sub > a::before {
  content: "";
  position: absolute;
  top: 17px;
  right: 10px;
  width: 0px;
  height: 0px;
  /* Creating the arrow using borders */

  border: 4px solid transparent;
  border-left: 4px solid #000;
}
/* Changing the color of the arrow on hover */
#cssmenu > ul li > a:hover::after,
#cssmenu > ul li:hover > a::after {
  border-left: 4px solid #ffffff;
}
#cssmenu > ul li > a:hover::before,
#cssmenu > ul li:hover > a::before {
  border-left: 4px solid rgba(0, 0, 0, 0.3);
}
/* THE SUBMENUS */
#cssmenu > ul ul {
  position: absolute;
  left: 100%;
  top: -9999px;
  padding-left: 5px;
  opacity: 0;
  width: 140px;
  /* The fade effect, created using an opacity transition */

  -webkit-transition: opacity 0.3s ease-in;
  -moz-transition: opacity 0.3s ease-in;
  transition: opacity 0.3s ease-in;
}
/* Showing the submenu when the user is hovering the parent link */
#cssmenu > ul li:hover > ul {
  top: 0px;
  opacity: 1;
}
</style>
