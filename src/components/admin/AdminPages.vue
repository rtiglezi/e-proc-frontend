<template>
  <div class="admin-pages">

    <PageTitle
      icon="fa fa-cogs"
      main="Administração do Sistema"
      sub="[Esta é uma área de acesso restrito]"
    />

  
    <b-tabs>
      <b-tab title="Usuários" active><UserAdmin /></b-tab>
      <b-tab title="Unidades"><DivisionAdmin /></b-tab>
    </b-tabs>
    
       
   

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
