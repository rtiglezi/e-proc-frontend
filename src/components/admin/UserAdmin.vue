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
            <b-form-group label="Login:" label-for="user-login">
              <b-form-input
                id="user-login"
                type="text"
                :readonly="mode === 'remove'"
                v-model="user.login"
                required
                placeholder="Informe o login do usuário..."
              />
            </b-form-group>
          </b-col>
          <b-col md="6" sm="12">
            <b-form-group label="Cargos:" label-for="user-cargos">
              <b-form-input
                id="user-cargos"
                type="text"
                :readonly="mode === 'remove'"
                v-model="user.profiles"
                required
                placeholder="Informe os cargos do usuário..."
              />
            </b-form-group>
          </b-col>
        </b-row>
        <div class="right">
          <b-button variant="primary" v-if="mode === 'save'" @click="save">Salvar</b-button>
          <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Excluir o Registro</b-button>
          <b-button ref="cancelar" class="ml-2" @click="reset">Cancelar</b-button>
        </div>
      </b-form>
    </div>

    <hr>

    <div class="total">Listando um total de {{ this.users.length }} registro(s)</div>

    <b-pagination
      size="sm"
      align="center"
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      first-text="Primeira"
      prev-text="Anterior"
      next-text="Próxima"
      last-text="Última"
      aria-controls="my-table"
    ></b-pagination>

    <div class="card card-table">
      <b-table
        id="my-table"
        :items="users"
        :per-page="perPage"
        :current-page="currentPage"
        small
        hover
        striped
        :fields="fields"
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
      perPage: 5,
      currentPage: 1,
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
        { key: "login", label: "Login", sortable: true },
        { key: "profiles", label: "Cargos", sortable: true },
        {
          key: "allowedDivision",
          label: "Unidades Permitidas",
          sortable: true
        },
        { key: "actions", label: "Ações", sortable: false }
      ]
    };
  },
  computed: {
    rows() {
      return this.users.length;
    }
  },
  methods: {
    loadUsers() {
      const url = `${baseApiUrl}/users`;
      axios.get(url).then(res => {
        this.users = res.data.items;
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
          this.reset();
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
      this.setFocus();
    },
    setFocus() {
      this.$refs.name.$el.focus();
      this.$refs.cancelar.innerHTML = "Cancelar";
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
.card-form {
  padding: 15px;
  background-color: #ececec;
}
.card-table {
  background-color: #fff;
}
.total {
  text-align: center;
  margin-bottom: 5px;
  color: rgb(15, 78, 23);
}
</style>
