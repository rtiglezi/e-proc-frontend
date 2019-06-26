import Vue from 'vue'
import Toasted from 'vue-toasted'

Vue.use(Toasted, {
    iconPack: 'fontawesome',
    duration: 3000,
    position: "top-center",
    theme: "bubble"
})

Vue.toasted.register(
    'defaultSuccess', 
    payload => !payload.msg ? 'Operação realizada com sucesso!' : payload.msg,
    { type: 'success', icon: 'check' }
)

Vue.toasted.register(
    'defaultError', 
    payload => !payload.msg ? 'Oops... Erro inesperdado.' : payload.msg,
    { type: 'error', icon: 'times' }
)