<template>
  <div class="user-admin">
    <b-nav small>
      <b-nav-item @click="showCad = true" active>Formulário</b-nav-item>
      <b-nav-item @click="showCad = false">Listagem</b-nav-item>
    </b-nav>

    <!-- INICIO FORMULÁRIO DE CADASTRO -->
    <b-card v-if="showCad">
      <b-form>
        <b-row>
          <b-col md="6" sm="12">
            <b-form-group label="Nome *" label-for="userName">
              <b-form-input
                ref="userName"
                name="Nome"
                id="userName"
                class="classOrange"
                v-model="user.name"
                :readonly="mode === 'remove'"
                v-validate="{ required: true, min: 3 }"
              ></b-form-input>
              <span
                ref="spnNome"
                v-if="showSpanError('Nome')"
                class="error"
              >{{ errors.first('Nome') }}</span>
            </b-form-group>
          </b-col>
          <b-col md="6" sm="12">
            <b-form-group label="E-mail *" label-for="user-email">
              <b-form-input
                class="form-control"
                prepend="@"
                name="E-mail"
                id="user-email"
                v-model="user.email"
                :readonly="mode === 'remove'"
                v-validate="'required|email'"
              ></b-form-input>
              <span v-if="showSpanError('E-mail')" class="error">{{ errors.first('E-mail') }}</span>
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
                <b-form-checkbox disabled value="user">user</b-form-checkbox>
                <b-form-checkbox :disabled="mode === 'remove'" value="admin">admin</b-form-checkbox>
                <b-form-checkbox :disabled="mode === 'remove'" value="master">master</b-form-checkbox>
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
        <b-button variant="info" class="ml-2" v-if="mode === 'save'" @click="save">
          <i class="fa fa-send fa-lg"></i>
          Adicionar Registro
        </b-button>
        <b-button variant="info" class="ml-2" v-if="mode === 'edit'" @click="save">
          <i class="fa fa-pencil fa-lg"></i>
          Editar Registro
        </b-button>
        <b-button variant="danger" class="ml-2" v-if="mode === 'remove'" @click="remove">
          <i class="fa fa-trash fa-lg"></i>
          Excluir este registro?
        </b-button>
        <b-button variant="secondary" @click="refresh(true, false)" class="ml-2">
          <i class="fa fa-eraser fa-lg"></i>
          Limpar Formulário
        </b-button>
      </b-form>
    </b-card>
    <!-- FINAL FORMULÁRIO DE CADASTRO -->

    <!-- INÍCIO DA LISTA -->
    <b-card v-if="!showCad">
      <b-row>
        <b-col></b-col>
        <b-col>
          <div class="text-center">Total de {{ totalRows }} registro(s)</div>
        </b-col>
        <b-col>
          <b-input-group>
            <b-form-input
              small
              ref="txtFilter"
              v-model="filter"
              placeholder="Busca rápida ..."
            ></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Limpar</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-col>
      </b-row>

      <b-table
        class="table mt-2"
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
       
              <b-button variant="outline-info" @click="loadUser(data.item, 'edit')" >
              <i
              class="fa fa-pencil"
              title="Editar o registro."></i></b-button>

              <b-button variant="outline-danger" class="ml-1" @click="loadUser(data.item, 'remove')"><i 
              class="fa fa-trash"
              title="Excluir o registro."
              ></i></b-button>
       
        </template>
     
      </b-table>

      <b-pagination
        small
        align="right"
        v-model="currentPage"
        :total-rows="totalRows"
        :per-page="perPage"
        aria-controls="my-table"
      ></b-pagination>
    </b-card>
    <!-- FINAL DA LISTA -->
  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";

export default {
  name: "UserAdmin",
  components: {},
  data: function() {
    return {
      btnCancelDisabled: false,
      mode: "save",
      divisions: [],
      user: {
        profiles: ["user"]
      },
      showCad: true,
      totalRows: 1,
      filter: null,
      currentPage: 1,
      perPage: 10,
      pageOptions: [5, 10, 15],
      options: [],
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
  methods: {
    loadDivisions() {
      const url = `${baseApiUrl}/divisions`;
      axios.get(url).then(res => {
        this.divisions = res.data;
      });
    },
    loadUser(user, mode) {
      this.mode = mode;
      const url = `${baseApiUrl}/users/${user._id}`;
      axios.get(url).then(res => {
        this.user = res.data;
        this.showCad = !this.showCad;
      });
    },
    save() {
      const method = this.user._id ? "patch" : "post";
      const id = this.user._id ? `/${this.user._id}` : "";

      this.$validator.validateAll().then(success => {
        if (!success) {
          return;
        }
        axios[method](`${baseApiUrl}/users${id}`, this.user)
          .then(() => {
            this.refresh(false, true);
          })
          .catch(showError);
      });
    },
    remove() {
      const id = this.user._id;
      axios
        .delete(`${baseApiUrl}/users/${id}`)
        .then(() => {
          this.refresh(false, true);
        })
        .catch(showError);
    },
    setFocus() {
      this.$refs.userName.$el.focus();
    },
    goToList() {
      this.$router.push(`/admin/user/list`);
    },
    showSpanError(campo) {
      let obj = this.errors.items;
      let index = obj.findIndex(val => val.field == campo);
      if (index < 0) {
        return false;
      } else {
        return true;
      }
    },
    loadUsers() {
      const url = `${baseApiUrl}/users`;
      axios.get(url).then(res => {
        this.users = res.data;
      });
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    refresh(showCadParam, showMessageSuccess) {
      this.mode = "save";
      this.user = {};
      this.user.profiles = ["user"];
      if (showMessageSuccess) {
        this.$toasted.global.defaultSuccess();
      }
      this.loadUsers();
      this.loadDivisions();
    }
  },
  mounted() {
    if (!this.mode) {
      this.mode = "save";
    }
    this.loadUsers();
    this.loadDivisions();
  }
};
</script>

<style>
.card-form {
  padding: 15px;
  background-color: red;
  margin-bottom: 10px;
}
.a-admin {
  color: #808080;
}
.error {
  margin-left: 5px;
  color: #6d630e;
  font-size: 11px;
  font-weight: normal;
  background-color: #eef8d7;
  background-image: url(~@/assets/alert-icon-red.png);
  background-size: 15px 15px;
  background-repeat: no-repeat;
  background-position: 2px;
  padding: 3px;
  border-radius: 5px 5px 5px;
  border: 1px solid #dce0be;
  padding-left: 20px;
  position: relative;
}
</style>
