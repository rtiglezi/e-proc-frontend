<template>
  <div class="user-admin">
    <div class="card card-form">
      <b-form>
        <input id="user-id" type="hidden" v-model="user._id">
        <b-row>
          <b-col md="6" sm="12">
            <b-form-group label="Nome:" label-for="user-name">
              <b-form-input
                ref="name"
                id="user-name"
                type="text"
                :readonly="mode === 'remove'"
                v-model="user.name"
                required
                placeholder="Informe o nome do usuário..."
              />
            </b-form-group>
          </b-col>
          <b-col md="6" sm="12">
            <b-form-group label="E-mail:" label-for="user-email">
              <b-form-input
                id="user-email"
                type="text"
                :readonly="mode === 'remove'"
                v-model="user.email"
                required
                placeholder="Informe o e-mail do usuário..."
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="6" sm="12">
            <b-form-group label="Perfis do usuário:" label-for="user-profiles">
              <b-form-checkbox-group
                stacked
                id="user-profiles"
                v-model="user.profiles"
                name="profiles"
              >
                <b-form-checkbox value="user">User</b-form-checkbox>
                <b-form-checkbox value="admin">Admin</b-form-checkbox>
                <b-form-checkbox value="master">Master</b-form-checkbox>
              </b-form-checkbox-group>
            </b-form-group>
          </b-col>
          <b-col md="6" sm="12">
            <b-form-group label="Unidades a que tem acesso:" label-for="user-allowedDivisions">
              <b-form-checkbox-group
                stacked
                id="user-allowedDivisions"
                v-model="user.allowedDivisions"
                name="divisions"
              >
                <b-form-checkbox
                  v-for="division in divisions"
                  :key="division._id"
                  :value="division._id"
                >{{ division.name }}</b-form-checkbox>
              </b-form-checkbox-group>
            </b-form-group>
          </b-col>
        </b-row>

        <hr>

        <div class="right">
          <b-button variant="primary" v-if="mode === 'save'" @click="save">Salvar</b-button>
          <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Excluir o Registro</b-button>
          <b-button ref="cancelar" class="ml-2" @click="reset">Cancelar</b-button>
        </div>
      </b-form>
    </div>

    <hr>

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
      <template slot="actions" slot-scope="data">
        <b-button variant="warning" @click="loadUser(data.item)" class="mr-2">
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button variant="danger" @click="loadUser(data.item, 'remove')" class="mr-2">
          <i class="fa fa-trash"></i>
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";

export default {
  name: "UserAdmin",
  data: function() {
    return {
      btnCancelDisabled: false,
      mode: "save",
      totalRows: 1,
      filter: null,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15],
      currentPage: 1,
      divisions: [],
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
        { key: "actions", label: "Ações", sortable: false }
      ]
    };
  },
  computed: {},
  methods: {
    loadDivisions() {
      const url = `${baseApiUrl}/divisions`;
      axios.get(url).then(res => {
        this.divisions = res.data.items;
      });
    },
    loadUsers() {
      const url = `${baseApiUrl}/users`;
      axios.get(url).then(res => {
        this.users = res.data.items;
        this.totalRows = users.length;
        this.setFocus();
        this.$refs.cancelar.innerHTML = "Limpar";
      });
    },
    reset() {
      this.mode = "save";
      this.user = {};
      this.loadUsers();
    },
    save() {
      const method = this.user._id ? "patch" : "post";
      const id = this.user._id ? `/${this.user._id}` : "";
      axios[method](`${baseApiUrl}/users${id}`, this.user)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          let lastUser = this.user;
          this.reset();
          this.loadUser(lastUser);
        })
        .catch(showError);
    },
    remove() {
      const id = this.user._id;
      axios
        .delete(`${baseApiUrl}/users/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    loadUser(user, mode = "save") {
      this.mode = mode;
      this.user = { ...user };
      this.totalRows = 1;
      this.setFocus();
    },
    setFocus() {
      this.$refs.name.$el.focus();
      this.$refs.cancelar.innerHTML = "Cancelar";
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    }
  },
  mounted() {
    this.loadDivisions();
    this.loadUsers();
  }
};
</script>

<style>
.right {
  text-align: left;
}
.card-form {
  padding: 15px;
  background-color: #ececec;
}
.total {
  text-align: center;
  margin-bottom: 5px;
  color: rgb(15, 78, 23);
}
</style>
