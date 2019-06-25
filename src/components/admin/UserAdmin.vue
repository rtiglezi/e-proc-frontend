<template>
  <div class="user-admin">
    <div class="text-left mb-3">
      <button @click="showCad = !showCad">{{ showCad }}</button>
    </div>

    <!-- INICIO FORMULÁRIO DE CADASTRO -->
    <div v-if="showCad" class="card card-form">
     
      <!-- 
      Erros: {{ errors.items }}
      <br>
      Usuario: {{ this.user }}
      -->
      
      <b-form class="form">
        <div class="card card-form">
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
        </div>
        <div class="right">
          <b-button
            variant="primary"
            class="ml-2"
            v-if="mode === 'save'"
            @click="save"
          >Incluir o novo registro</b-button>
          <b-button
            variant="success"
            class="ml-2"
            v-if="mode === 'edit'"
            @click="save"
          >Editar este registro</b-button>
          <b-button
            variant="danger"
            class="ml-2"
            v-if="mode === 'remove'"
            @click="remove"
          >Excluir este registro ?</b-button>
          <b-button variant="default" @click="refresh(true, false)" class="ml-2">Limpar o formulário</b-button>
        </div>
      </b-form>
    </div>
    <!-- FINAL FORMULÁRIO DE CADASTRO -->

    <!-- INÍCIO DA LISTA -->
    <div v-if="!showCad" class="card card-form">
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

      <b-table
        class="table"
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
      user: {},
      showCad: true,
      totalRows: 1,
      filter: null,
      currentPage: 1,
      perPage: 5,
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
      this.mode = 'save';
      this.user = {};
      this.user.profiles = ["user"];
      this.showCad = showCadParam;
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
  background-color: #f8f9fa;
  margin-bottom: 10px;
}
.a-admin {
  color: #808080;
}
.error {
  margin-left: 5px;
  color: #800000;
  font-size: 11px;
  font-weight: normal;
  background-color: #f8d7da;
  background-image: url(~@/assets/alert-icon-red.png);
  background-size: 15px 15px;
  background-repeat: no-repeat;
  background-position: 2px;
  padding: 3px;
  border-radius: 5px 5px 5px;
  border: 1px solid #ffb3b3;
  padding-left: 20px;
  position: relative;
}
.edit {
  font-size: 18px;
  color: #555;
}

.delete {
  font-size: 18px;
  color: red;
}
</style>
