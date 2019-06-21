<template>
    <div class="admin-pages">
        <PageTitle icon="fa fa-cogs" main="Administração do Sistema" sub="Área reservada aos administradores"/>
        <div class="admin-pages-tabs">
            <b-card no-body>
                <b-tabs card>
                    <b-tab title="Usuários" active>
                        <UserAdmin />
                    </b-tab>
                    <b-tab title="Unidades">
                        <DivisionAdmin />
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
    </div>
    
</template>

<script>

import PageTitle from '../template/PageTitle'
import UserAdmin from './UserAdmin'
import DivisionAdmin from './DivisionAdmin'

export default {
    name: 'AdminPages',
    components: { PageTitle, UserAdmin,  DivisionAdmin }
}

</script>

<style>

</style>
