<template>
  <div class="confirm">
  </div>
</template>

<script>
export default {
  name: "Confirm",
  mounted() {
    this.$toasted.global.confirm();
    let origin = this.$route.query.origin;
    this.$router.push(`/admin/${origin}`);
  }
};
</script>

<style>
</style>
