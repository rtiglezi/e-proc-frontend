<template>
  <div class="user-admin">
    <router-view></router-view>
  </div>
</template>


<script>
import UserAdminCad from "./UserAdminCad";
import UserAdminList from "./UserAdminList";

export default {
  components: { UserAdminCad, UserAdminList },
  name: "UserAdmin"
};
</script>

<style>
</style>
