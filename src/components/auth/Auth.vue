<template>
  <div class="auth-content">
    <div class="auth-modal">
      <img src="@/assets/c-proc.png" alt="Logo" width="80" align="left">
      <span class="auth-logo">ceproc</span>
      <hr>
      <div class="auth-title">Login</div>
      <input v-model="user.email" type="text" placeholder="E-mail">
      <input v-model="user.password" type="password" placeholder="Senha">
      <button @click="signin">Entrar</button>
    </div>
  </div>
</template>

<script>
import { baseApiUrl, showError, userKey } from "@/global";
import axios from "axios";

export default {
  name: "Auth",
  data: function() {
    return {
      user: {}
    };
  },
  methods: {
    signin() {
      axios
        .post(`${baseApiUrl}/users/authenticate`, this.user)
        .then(res => {
          this.$store.commit("setUser", res.data);
          localStorage.setItem(userKey, JSON.stringify(res.data));
          this.$router.push({ path: "/" });
          this.$toasted.global.defaultSuccess({
            msg: `Bem-vindo, ${res.data.name}.`
          });
        })
        .catch(e => {
          if (e) {
            showError("Credenciais inválidas.");
          }
        });
    }
  }
};
</script>

<style>
.auth-content {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
}

.auth-modal {
  background-color: #fff;
  width: 350px;
  padding: 35px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);

  display: flex;
  flex-direction: column;
  align-items: center;
}


.auth-logo {
  font-size: 1.5rem;
  font-weight: bold;
}

.auth-title {
  font-size: 1.2rem;
  font-weight: 100;
  margin-top: 10px;
  margin-bottom: 15px;
}

.auth-modal input {
  border: 1px solid #bbb;
  width: 100%;
  margin-bottom: 15px;
  padding: 3px 8px;
}

.auth-modal button {
  align-self: flex-end;
  background-color: #2460ae;
  color: #fff;
  padding: 5px 15px;
}

.auth-modal a {
  margin-top: 35px;
}

.auth-modal hr {
  border: 0;
  width: 100%;
  height: 1px;
  background-image: linear-gradient(
    to right,
    rgba(120, 120, 120, 0),
    rgba(120, 120, 120, 0.75),
    rgba(120, 120, 120, 0)
  );
}
</style>
