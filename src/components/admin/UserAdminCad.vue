<template>
  <div class="user-admin">
    <PageTitle icon="fa fa-cogs" main="Usuários" sub="Formulário de cadastro"/>
    
    <div class="card text-center">
      <div class="card-header">
        <ul class="nav nav-tabs card-header-tabs">
          <li class="nav-item">
            <router-link to="/user/cad">
              <a class="nav-link active"><i class="fa fa-address-card"></i> Formulário</a>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/user/list">
              <a class="nav-link"><i class="fa fa-list-alt"></i> Lista</a>
            </router-link>
          </li>
        </ul>
      </div>
    </div>

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
                <b-form-checkbox :disabled="mode === 'remove'" value="user">user</b-form-checkbox>
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
                  :disabled="mode === 'remove'"
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
          <b-button
            variant="primary"
            class="ml-2"
            v-if="mode === 'save'"
            @click="save"
          >Adicionar este usuário</b-button>
          <b-button
            variant="warning"
            class="ml-2"
            v-if="mode === 'edit'"
            @click="save"
          >Confirmar as alterações ?</b-button>
          <b-button
            variant="danger"
            class="ml-2"
            v-if="mode === 'remove'"
            @click="remove"
          >Excluir esse usuário ?</b-button>
          <b-button
            variant="default"
            class="ml-2"
            v-if="(mode === 'edit') || (mode === 'remove')"
            @click="refreshPage"
          >Cancelar</b-button>

         
        </div>
      </b-form>
    </div>
  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";
import PageTitle from "../template/PageTitle";

export default {
  name: "UserAdminCad",
  components: { PageTitle },
  data: function() {
    return {
      mode: "",
      btnCancelDisabled: false,
      mode: "save",
      divisions: [],
      options: [],
      user: {}
    };
  },
  computed: {},
  methods: {
    loadDivisions() {
      const url = `${baseApiUrl}/divisions`;
      axios.get(url).then(res => {
        this.divisions = res.data;
      });
    },
    loadUser(id) {
      const url = `${baseApiUrl}/users/${id}`;
      axios.get(url).then(res => {
        this.user = res.data;
      });
    },
    save() {
      const method = this.user._id ? "patch" : "post";
      const id = this.user._id ? `/${this.user._id}` : "";
      axios[method](`${baseApiUrl}/users${id}`, this.user)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.refreshPage();
        })
        .catch(showError);
    },
    remove() {
      const id = this.user._id;
      axios
        .delete(`${baseApiUrl}/users/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.refreshPage();
        })
        .catch(showError);
    },
    setFocus() {
      this.$refs.name.$el.focus();
    },
    goToList() {
      this.$router.push(`/user/list`);
    },
    refreshPage() {
      this.mode = "save";
      this.user = {};
      this.setFocus();
    }
  },
  mounted() {
    const id = this.$route.params.id;
    this.mode = this.$route.params.mode;
    if (!this.mode) {
      this.mode = "save";
    }
    if (id) {
      this.loadUser(id);
    }
    this.loadDivisions();
  }
};
</script>

<style>
.right {
  text-align: left;
}
.card-form {
  padding: 15px;
  background-color: white;
}
.total {
  text-align: center;
  margin-bottom: 5px;
  color: rgb(15, 78, 23);
}
.act {
  background-color: red;
}
</style>
