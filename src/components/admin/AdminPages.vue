<template>
    <div class="admin-pages">
        <PageTitle icon="fa fa-cogs" main="Administração do Sistema" sub="Área reservada aos administradores"/>
        <div class="admin-pages-tabs">
            <b-card no-body>
                <b-tabs v-model="tabIndex" card>
                    <b-tab title="Cadastro de Usuários" active>
                        <UserAdminCad />
                    </b-tab>
                    <b-tab title="Lista de Usuários">
                        <UserAdminList />
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>


         <b-button-group class="mt-2">
        <b-button @click="tabIndex--">Previous</b-button>
        <b-button @click="tabIndex++">Next</b-button>
      </b-button-group>

        <div class="text-muted">Current Tab: {{ tabIndex }}</div>
    </div>

    
    
</template>

<script>

import PageTitle from '../template/PageTitle'
import UserAdminCad from './UserAdminCad'
import UserAdminList from './UserAdminList'

export default {
    name: 'AdminPages',
    components: { PageTitle, UserAdminCad,  UserAdminList },
    data: function() {
    return {
      tabIndex: 1
    };
  },
}

</script>

<style>

</style>
