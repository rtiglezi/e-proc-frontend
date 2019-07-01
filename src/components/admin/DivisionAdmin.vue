<template>
  <div class="division-admin">
    <PageTitle
      icon="fa fa-sitemap fa-1x"
      main="Cadastro de Unidades"
      sub="Área administrativa de acesso restrito"
    />

    <!-- INICIO FORMULÁRIO DE CADASTRO -->
    <b-form v-if="showCad" v-on:submit.prevent="onSubmit" v-on:keyup.enter="submitByKey">
      <b-card class="adm-box mb-2">
        <b-row>
          <b-col md="3" sm="12" class="adm-box-ico">
            <i class="fa fa-sitemap fa-5x" aria-hidden="true"></i>
            <br>Dados cadastrais da
            <br>UNIDADE
          </b-col>
          <b-col md="9" sm="12">
            <b-form-group label="Nome *" label-for="divisionName">
              <b-form-input
                ref="divisionName"
                name="Nome"
                id="divisionName"
                class="classOrange"
                v-model="division.name"
                :readonly="mode === 'remove'"
                v-validate="{ required: true, min: 3 }"
              ></b-form-input>
              <span
                ref="spnNome"
                v-if="showSpanError('Nome')"
                class="adm-msg-error"
              >{{ errors.first('Nome') }}</span>
            </b-form-group>
          </b-col>
        </b-row>
      </b-card>

      <div class="text-right">
        <b-button class="adm-btn-main ml-2" v-if="mode === 'save'" @click="save">
          <i class="fa fa-send fa-lg"></i>
          Inserir
        </b-button>
        <b-button class="adm-btn-main ml-2" v-if="mode === 'edit'" @click="save">
          <i class="fa fa-pencil fa-lg"></i>
          Editar
        </b-button>
        <b-button variant="danger" class="ml-2" v-if="mode === 'remove'" @click="remove">
          <i class="fa fa-trash fa-lg"></i>
          Excluir?
        </b-button>
        <b-button @click="refresh(true)" class="ml-2">
          <i class="fa fa-eraser fa-lg"></i>
          Limpar
        </b-button>
        <b-button @click="showCad = false" class="ml-4">
          Listagem
          <i class="fa fa-arrow-right fa-lg ml-1"></i>
        </b-button>
      </div>
    </b-form>
    <!-- FINAL FORMULÁRIO DE CADASTRO -->

    <!-- INÍCIO DA LISTA -->
    <div v-if="!showCad">
      <b-row>
        <b-col>
          <div class="text-center">Total de {{ totalRows }} registro(s)</div>
        </b-col>
        <b-col>
          <b-input-group>
            <b-form-input small ref="txtFilter" v-model="filter" placeholder="Busca rápida ..."></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Limpar</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-col>
      </b-row>

        <b-table
          class="mt-3"
          id="my-table"
          :items="divisions"
          :per-page="perPage"
          :current-page="currentPage"
          small
          responsive
          bordered
          :filter="filter"
          :fields="fields"
          @filtered="onFiltered"
        >
          <template slot="actions" slot-scope="data">
            <b-button @click="loadDivision(data.item, 'edit')">
              <i class="fa fa-pencil" title="Editar o registro."></i>
            </b-button>

            <b-button variant="danger" class="ml-1" @click="loadDivision(data.item, 'remove')">
              <i class="fa fa-trash" title="Excluir o registro."></i>
            </b-button>
          </template>
        </b-table>
 
      <b-row>
        <b-col>
          <b-button @click="showCad = true">
            <i class="fa fa-arrow-left fa-lg mr-1"></i>Formulário
          </b-button>
        </b-col>
        <b-col>
          <b-pagination
            small
            align="right"
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            aria-controls="my-table"
          ></b-pagination>
        </b-col>
      </b-row>
    </div>
    <!-- FINAL DA LISTA -->
  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";
import PageTitle from "../template/PageTitle";
import Confirm from "./Confirm";

export default {
  name: "divisionAdmin",
  components: { PageTitle, Confirm },
  data: function() {
    return {
      btnCancelDisabled: false,
      mode: "save",
      divisions: [],
      division: {},
      showCad: true,
      totalRows: 1,
      filter: null,
      currentPage: 1,
      perPage: 7,
      pageOptions: [5, 10, 15],
      options: [],

      fields: [
        {
          key: "_id",
          label: "Código",
          sortable: true,
          thClass: "adm-table-th",
          tdClass: "adm-table-td"
        },
        { key: "name", label: "Nome", sortable: true,   thClass: "adm-table-th",
          tdClass: "adm-table-td" },
        {
          key: "actions",
          label: "Ações",
          sortable: false,
          class: "text-center",
          thClass: "adm-table-th",
          tdClass: "adm-table-td"
        }
      ]
    };
  },
  methods: {
    loadDivisions() {
      const url = `${baseApiUrl}/divisions`;
      axios.get(url).then(res => {
        this.divisions = res.data;
      })
    },
    loadDivision(division, mode) {
      this.mode = mode;
      const url = `${baseApiUrl}/divisions/${division._id}`;
      axios.get(url).then(res => {
        this.division = res.data;
        this.showCad = !this.showCad;
      });
    },
    save() {
      const method = this.division._id ? "patch" : "post";
      const id = this.division._id ? `/${this.division._id}` : "";

      this.$validator.validateAll().then(success => {
        if (!success) {
          return;
        }
        axios[method](`${baseApiUrl}/divisions${id}`, this.division)
          .then(() => {
            this.refresh();
          })
          .catch(showError);
      });
    },
    remove() {
      const id = this.division._id;
      axios
        .delete(`${baseApiUrl}/divisions/${id}`)
        .then(() => {
          this.refresh();
        })
        .catch(showError);
    },
    setFocus() {
      this.$refs.divisionName.$el.focus();
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
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    refresh(isCleaningForm) {
      let doRefreshPage = true;

      if (!isCleaningForm) {
        switch (this.mode) {
          case "save":
            this.$toasted.global.defaultSuccess({
              msg: "Unidade inserida com sucesso."
            });
            break;
          case "edit":
            this.$toasted.global.defaultSuccess({
              msg: "Dados da Unidade editados com sucesso."
            });
            doRefreshPage = false;
            break;
          case "remove":
            this.$toasted.global.defaultSuccess({
              msg: "Unidade excluída do sistema com sucesso."
            });
            break;
        }
      }

      this.loadDivisions();

      if (doRefreshPage) {
        let msg = "Formulário pronto para nova inserção.";
        this.$router.push(`/admin/confirm?origin=divisions&msg=${msg}`);
      }
    },
    submitByKey() {
      if (this.mode === "save" || this.mode === "edit") {
        this.save();
      } else if (this.mode === "remove") {
        this.remove();
      }
    }
  },
  mounted() {
    if (!this.mode) {
      this.mode = "save";
    }
    this.loadDivisions();
    this.setFocus();
  }
};
</script>

<style>
</style>
