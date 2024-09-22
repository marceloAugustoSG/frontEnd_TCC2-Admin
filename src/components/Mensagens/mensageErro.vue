<template>
    <v-sheet elevation="2" max-width="600" rounded="lg" width="100%" class="pa-4 text-center mx-auto" border>
        <v-icon class="mb-5" color="success" icon="mdi-check-circle" size="100"></v-icon>

        <h2 class="text-h5 mb-6">Erro ao agendar a consulta</h2>

        <p class="mb-4 text-medium-emphasis text-body-2">

        </p>



        <p class="mb-4 text-medium-emphasis text-body-2">

            Uma mensagem de confirmação será enviada para o Paciente: <br /><br /> <strong>{{
                store.state.agendamento.consulta.Paciente.nome }}</strong> </p>

        <v-divider class="mb-4"></v-divider>

        <div class="text-end">
            <v-btn class="text-none" color="success" variant="flat" width="90" @click="fechar">
                OK
            </v-btn>
        </div>
    </v-sheet>
</template>

<script setup>
import { useStore } from 'vuex';
import { defineProps } from 'vue';

const props = defineProps({
    mensagem: String

})


const store = useStore()
function fechar() {
    store.dispatch('setIsMsgSAgendamento', false)


}
</script>
