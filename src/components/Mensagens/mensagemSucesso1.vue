<template>
    <v-sheet elevation="12" max-width="600" rounded="lg" width="100%" class="pa-4 text-center mx-auto">
        <v-icon class="mb-5" color="success" icon="mdi-check-circle" size="112"></v-icon>
        <h2 class="text-h5 mb-6">{{ props.mensagem }}</h2>
        <div class="text-end">
            <v-btn class="text-none" color="success" variant="flat" width="90" @click="fechar">
                OK
            </v-btn>
        </div>
    </v-sheet>
</template>

<script setup>
import { useStore } from 'vuex';

const props = defineProps({
    mensagem: String

})
const store = useStore()
function fechar() {
    store.dispatch('listarProfissionais')
    store.dispatch('listarCompromissos')
    store.dispatch('setShowModalSucesso', false)
    store.dispatch('setMsgSaveProf', false)


}
</script>
