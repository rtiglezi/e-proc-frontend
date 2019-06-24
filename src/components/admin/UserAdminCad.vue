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

    <b-form class="form">
      <div class="card card-form">
        <b-row>
          <b-col md="6" sm="12">
            <b-form-group label="Nome:" label-for="user-name">
              <b-form-input
                ref="user-name"
                id="user-name"
                v-model="user.name"
                :readonly="mode === 'remove'"
              />
            </b-form-group>
          </b-col>
          <b-col md="6" sm="12">
            <b-form-group label="E-mail:" label-for="user-email">
              <b-form-input id="user-email" v-model="user.email" :readonly="mode === 'remove'"/>
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
      </div>
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
      options: [],
      user: {},
      myObj: {},
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
      this.$refs.user-name.$el.focus();
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
    this.myObj = this.$refs.name;

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
  background-color: #f8f9fa;
  margin-bottom: 10px;
}
.total {
  text-align: center;
  margin-bottom: 5px;
  color: rgb(15, 78, 23);
}
.a-admin {
  color: green;
}
.red {
  color: red;
}

.green {
  color: green;
}
</style>
