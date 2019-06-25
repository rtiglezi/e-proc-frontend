<template>
  <div class="user-admin">

    Erros: {{ errors.items }}

    <div class="text-left">
      <router-link to="/admin/user/cad" class="a-admin">
        <i class="fa fa-plus-square mr-1"></i>Formulário
      </router-link>
      <span class="ml-3"></span>
      <router-link to="/admin/user/list" class="a-admin">
        <i class="fa fa-th-list mr-1"></i>Listagem
      </router-link>
    </div>

    <b-form class="form" v-if = "showForm">
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
              <span ref="spnNome" v-if="showSpanError('Nome')" class="error">{{ errors.first('Nome') }}</span>
            </b-form-group>
          </b-col>
          <b-col md="6" sm="12">
            <b-form-group label="E-mail *" label-for="user-email">
              <b-form-input name="E-mail" id="user-email" v-model="user.email" :readonly="mode === 'remove'"
                v-validate="'required|email'"></b-form-input>
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
                name="profiles">
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
                name="divisions">
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
      </div>
      <div class="right">
        <b-button
          variant="primary"
          class="ml-2"
          v-if="mode === 'save'"
          :disabled="errors.items.length > 0"
          @click="save"
        >Adicionar</b-button>
        <b-button
          variant="primary"
          class="ml-2"
          v-if="mode === 'edit'"
          :disabled="errors.items.length > 0"
          @click="save"
        >Editar o registro</b-button>
        <b-button
          variant="danger"
          class="ml-2"
          v-if="mode === 'remove'"
          @click="remove"
        >Excluir este registro ?</b-button>
        <b-button
          variant="default"
          class="ml-2"
          v-if="(mode === 'edit') || (mode === 'remove')"
          @click="refreshPage"
        >Cancelar</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";

export default {
  name: "UserAdminCad",
  components: {},
  data: function() {
    return {
      btnCancelDisabled: false,
      mode: "save",
      divisions: [],
      user: {},
      showForm: true
    };
  },
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
      this.$refs.userName.$el.focus();
    },
    goToList() {
      this.$router.push(`/admin/user/list`);
    },
    refreshPage() {
       this.user = {};
       this.mode = 'save';
       this.errors.items = [];
    },
    showSpanError(campo) {
      let obj = this.errors.items;
      let index = obj.findIndex(val=>val.field == campo)
      if (index < 0) {
        return false;
      } else {
        return true;
      }
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
.card-form {
  padding: 15px;
  background-color: #f8f9fa;
  margin-bottom: 10px;
}
.a-admin {
  color: #808080;
}
.error {
margin-left:5px;
color: #800000; 
font-size: 11px;
font-weight: normal;
background-color: #F8D7DA;
background-image:url(~@/assets/alert-icon-red.png);
background-size: 15px 15px;
background-repeat:no-repeat;
background-position:2px;
padding: 3px;
border-radius: 5px 5px 5px;
border: 1px solid #ffb3b3;
padding-left: 20px;
position:relative;
}


</style>
