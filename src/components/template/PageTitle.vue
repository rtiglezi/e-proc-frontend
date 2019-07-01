<template>
  <div class="page-title">
    <h1>
      <i v-if="icon" :class="icon"></i>
      {{ main }} <span class="page-subtitle">- {{sub}}</span>
    </h1>
    <hr>
  </div>
</template>

<script>
export default {
  name: "PageTitle",
  props: ["icon", "main", "sub"]
};
</script>

<style>
.page-title h1 {
  font-size: 1.2rem;
}

.page-subtitle {
  margin-top: 3px;
  font-size: 1rem;
  color: #555;
}

.page-title hr {
  border: 0;
  width: 100%;
  height: 3px;
  background-image: linear-gradient(
    to right,
    rgba(120, 120, 120, 0.5),
    rgba(120, 120, 120, 0)
  );
}

</style>
