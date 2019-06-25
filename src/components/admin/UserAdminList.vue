<template>
  <div class="user-admin">
    <div class="text-left">
      <router-link to="/admin/user/cad" class="a-admin">
        <i class="fa fa-plus-square mr-1"></i>Formulário
      </router-link>
      <span class="ml-3"></span>
      <router-link to="/admin/user/list" class="a-admin">
        <i class="fa fa-th-list mr-1"></i>Listagem
      </router-link>
    </div>

    <div class="card card-form">
     
        <b-row>
          <b-col>
            <b-form-group label="Busca rápida:">
              <b-input-group>
                <b-form-input v-model="filter" placeholder="Digite o termo ..."></b-form-input>
                <b-input-group-append>
                  <b-button :disabled="!filter" @click="filter = ''">Limpar</b-button>
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
          </b-col>
          <b-col>
            <div class="mb-2 text-center">Total de {{ totalRows }} registro(s)</div>
            <b-pagination
              v-model="currentPage"
              :total-rows="totalRows"
              :per-page="perPage"
              first-text="Primeira"
              prev-text="Anterior"
              next-text="Próxima"
              last-text="Última"
              aria-controls="my-table"
            ></b-pagination>
          </b-col>
          <b-col>
            <b-form-group label-cols-sm="3" label="Registros por página:" class="mb-0">
              <b-form-select v-model="perPage" :options="pageOptions"></b-form-select>
            </b-form-group>
          </b-col>
        </b-row>
 

      <b-table class="table"
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
          <b-button variant="default" @click="loadUser(data.item, 'edit')" class="mr-2">
            <i class="fa fa-pencil edit"></i>
          </b-button>
          <b-button variant="default" @click="loadUser(data.item, 'remove')" class="mr-2">
            <i class="fa fa-trash delete"></i>
          </b-button>
        </template>
      </b-table>
    </div>
  </div>
</template>


<script>
import { baseApiUrl } from "@/global";
import axios from "axios";

export default {
  name: "UserAdminList",
  components: {},
  data: function() {
    return {
      totalRows: 1,
      filter: null,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15],
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
      this.$router.push(`/admin/user/cad/${user._id}/${mode}`);
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
.edit {
  font-size: 18px;
  color: #555;
}

.delete {
  font-size: 18px;
  color: red;
}
</style>
