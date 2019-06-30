<template>
  <div class="content">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Content"
};
</script>

<style>
.content {
  grid-area: content;
  background-color: #232f3e;
  padding: 15px;
  color: white;
}
</style>
