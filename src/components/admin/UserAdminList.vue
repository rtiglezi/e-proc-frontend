<template>
  <div class="user-admin">
    <PageTitle icon="fa fa-cogs" main="Usuários" sub="Lista dos usuários cadastrados"/>

    <div class="card text-center">
      <div class="card-header">
        <ul class="nav nav-tabs card-header-tabs">
          <li class="nav-item">
            <router-link to="/user/cad">
             <a class="nav-link"><i class="fa fa-address-card"></i> Formulário</a> 
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/user/list">
              <a class="nav-link active"><i class="fa fa-list-alt"></i> Lista</a>
            </router-link>
          </li>
        </ul>
      </div>
    </div>

    <div class="card card-form">
      <div class="total">Total de {{ totalRows }} registro(s)</div>

      <b-pagination
        size="sm"
        align="center"
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="perPage"
        first-text="Primeira"
        prev-text="Anterior"
        next-text="Próxima"
        last-text="Última"
        aria-controls="my-table"
      ></b-pagination>

      <b-row>
        <b-col md="8">
          <b-form-group label="Filtro" class="mb0">
            <b-input-group>
              <b-form-input v-model="filter" placeholder="Digite o termo..."></b-form-input>
              <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''">Limpar</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>

        <b-col md="4">
          <b-form-group label-cols-sm="3" label="Registros por página" class="mb-0">
            <b-form-select v-model="perPage" :options="pageOptions"></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>

      <b-table
        id="my-table"
        :items="users"
        :per-page="perPage"
        :current-page="currentPage"
        small
        hover
        striped
        responsive
        bordered
        :filter="filter"
        :fields="fields"
        @filtered="onFiltered"
      >
        <template slot="profiles" slot-scope="row">
          <ul>
            <li v-for="(value, key) in row.item.profiles" :key="key">{{ value }}</li>
          </ul>
        </template>

        <template slot="allowedDivisionsDetails" slot-scope="row">
          <ul>
            <li
              v-for="(item, index) in row.item.allowedDivisionsDetails"
              :key="item.id"
              :index="index"
            >{{row.item.allowedDivisionsDetails[index].name}}</li>
          </ul>
        </template>

        <template slot="actions" slot-scope="data">
          <b-button variant="warning" @click="loadUser(data.item, 'edit')" class="mr-2">
            <i class="fa fa-pencil"></i>
          </b-button>
          <b-button variant="danger" @click="loadUser(data.item, 'remove')" class="mr-2">
            <i class="fa fa-trash"></i>
          </b-button>
        </template>
      </b-table>
    </div>
  </div>
</template>


<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";
import PageTitle from "../template/PageTitle";

export default {
  name: "UserAdminList",
  components: { PageTitle },
  data: function() {
    return {
      totalRows: 1,
      filter: null,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15],
      currentPage: 1,
      options: [],
      user: {},
      users: [],
      fields: [
        {
          key: "links",
          label: "Links",
          sortable: false,
          thClass: "d-none",
          tdClass: "d-none"
        },
        {
          key: "_id",
          label: "Código",
          sortable: true,
          thClass: "d-none",
          tdClass: "d-none"
        },
        { key: "name", label: "Nome", sortable: true },
        { key: "email", label: "E-mail", sortable: true },
        { key: "profiles", label: "Perfis", sortable: true },
        { key: "allowedDivisionsDetails", label: "Unidades", sortable: true },
        {
          key: "actions",
          label: "Ações",
          sortable: false,
          class: "text-center"
        }
      ]
    };
  },
  computed: {},
  methods: {
    loadUsers() {
      const url = `${baseApiUrl}/users`;
      axios.get(url).then(res => {
        this.users = res.data;
      });
    },
    loadUser(user, mode) {
      this.$router.push(`/user/cad/${user._id}/${mode}`);
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    }
  },
  mounted() {
    this.loadUsers();
  }
};
</script>

<style>
.right {
  text-align: left;
}

.total {
  text-align: center;
  margin-bottom: 5px;
  color: rgb(15, 78, 23);
}
</style>
