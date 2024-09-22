<template>
  <v-app>
    <v-dialog v-model="alertMessage" max-width="500">
      <v-card>
        <Alert type="error" title="Aviso" variant="outlined" text="email ou senha incorretos" />
      </v-card>
    </v-dialog>
    <v-container class="fill-height">
      <v-row class="p-4">
        <v-col cols="12" lg="3" md="2" sm="2" xl="4" />
        <v-col cols="12" lg="6" md="8" sm="8" xl="4">
          <v-sheet max-width="400" class="mx-auto pa-3" border rounded>
            <v-card-text>
              <h2 class="text-center">Login</h2>
            </v-card-text>
            <v-card>
              <v-card-item>
                <form @submit.prevent="submit">
                  <v-text-field prepend-inner-icon="mdi-email" variant="outlined" v-model="usuario.email"
                    :rules="emailRules" label="E-mail" required />
                  <v-text-field prepend-inner-icon="mdi-form-textbox-password" variant="outlined"
                    v-model="usuario.password" :append-inner-icon="showpassword ? 'mdi-eye' : 'mdi-eye-off'
                      " :type="showpassword ? 'text' : 'password'" @click:append-inner="showpassword = !showpassword"
                    label="Senha" required />
                  <v-row class="pb-5">
                    <v-col>
                      <v-btn type="submit" class="w-100" text="Entrar" prepend-icon="mdi-login" color="#0056b3 " />
                    </v-col>
                  </v-row>
                </form>
              </v-card-item>
            </v-card>
          </v-sheet>
          <v-col cols="12" lg="3" md="2" sm="2" xl="4" />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup>
import { ref, reactive, onBeforeMount } from "vue";
import { useStore } from "vuex"
import { useRouter } from "vue-router";
import Alert from "@/components/Alert.vue";

const store = useStore();
const router = useRouter();
let alertMessage = ref(false)

let usuario = reactive({
  email: '',
  password: '',
})
const showpassword = ref(false)
const emailRules = ref([
  v => !!v || 'E-mail é obrigatório',
  v => /^[a-zA-Z0-9._%+-]+@edu\.ufes\.br/.test(v) || 'E-mail deve ser válido(@edu.ufes.br)',
])


async function submit() {

  await store.dispatch('logar', usuario).then(() => {
    const message = store.state.loginLogout.message

    console.log(store)
    message ? alertMessage.value = true : alertMessage.value = false
    router.push({ name: 'dashboard' })
  }).catch((e) => {
    console.log(e)
  })
}


onBeforeMount(async () => {
  await store.dispatch('init');
});


</script>

<style>
.text-center {
  text-align: center;
}
</style>