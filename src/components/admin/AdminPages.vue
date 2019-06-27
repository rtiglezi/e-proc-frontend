<template>
  <div class="admin-pages">

    <PageTitle
      icon="fa fa-cogs"
      main="Administração do Sistema"
      sub="[Esta é uma área de acesso restrito]"
    />

   <b-card no-body>
    <b-tabs small card>
      <b-tab class="pl-3 pt-2 pr-3 pb-10" title="Usuários" active><UserAdmin /></b-tab>
      <b-tab class="p-5" title="Unidades"><DivisionAdmin /></b-tab>
    </b-tabs>
    </b-card>

  </div>
</template>

<script>
import PageTitle from "../template/PageTitle";
import UserAdmin from "./UserAdmin";
import DivisionAdmin from "./DivisionAdmin";

export default {
  name: "AdminPages",
  components: { PageTitle, UserAdmin, DivisionAdmin },
  data: function() {
    return {
    };
  }
};
</script>

<style>
</style>
