<template>
    <v-container>

        <v-dialog v-model="store.state.controladoresTela.showMDeletarProf" max-width="800px" persistent>
            <msgDeletarProfissional />
        </v-dialog>

        <v-dialog v-model="store.state.controladoresTela.msgSaveProf">
            <mensagemSucesso1 :mensagem="'Compromisso criado com sucesso!'" />
        </v-dialog>

        <v-card border>




            <v-dialog v-model="store.state.controladoresTela.showMessageConflitoCompromisso" max-width="600px">
                <v-alert type="warning" density="compact" title="Aviso">Horário já ocupado para esse
                    profissional</v-alert>
            </v-dialog>


            <v-dialog v-model="store.state.controladoresTela.showMNewCompromisso" max-width="600px" persistent>
                <criarCompromisso />
            </v-dialog>
            <v-toolbar>
                <v-toolbar-title text="Agenda" />
                <v-spacer />
                <v-btn @click="showNewCompromisso" prepend-icon="mdi-plus-circle" text="Novo compromisso" color="create"
                    variant="flat" elevation="5" style="border-radius: 5px" />
            </v-toolbar>

            <v-container class="pr-5" v-if="compromissos.length === 0">
                <v-alert type="warning">Nenhum compromisso registrado</v-alert>
            </v-container>

            <v-container v-else>
                <v-card border>

                    <v-table class="ma-5">
                        <thead>
                            <tr>

                                <th class="text-left">
                                    Título
                                </th>

                                <th class="text-left">
                                    Data
                                </th>
                                <th class="text-left">
                                    Dia da semana
                                </th>
                                <th class="text-left">
                                    Horário de Início
                                </th>
                                <th class="text-left">
                                    Horário de fim
                                </th>
                                <th class="text-left">
                                    Ações
                                </th>


                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="compromisso in compromissos" :key="compromisso.id">
                                <td>{{ compromisso.tituloCompromisso }}</td>
                                <!-- <td>{{ formatarData(compromisso.dataCompromisso) }}</td> -->
                                <td>{{ formatarDt(compromisso.dataCompromisso) }}</td>
                                <td>{{ obterDiaDaSemana(compromisso.dataCompromisso) }}</td>
                                <td>{{ formatHour(compromisso.horaInicio) }}</td>
                                <td>{{ formatHour(compromisso.horaFim) }}</td>

                                <td style="gap: 10px;">


                                    <v-btn variant="flat">
                                        <v-icon @click="deletar(compromisso)" color="#FF6B6B " icon="mdi-delete" />
                                        <v-tooltip activator="parent" location="top">Excluir</v-tooltip>
                                    </v-btn>

                                </td>
                            </tr>
                        </tbody>
                    </v-table>


                </v-card>
            </v-container>
        </v-card>
    </v-container>
</template>

<script setup>
import { computed, onBeforeMount, ref } from 'vue';
import mensagemSucesso1 from '@/components/Mensagens/mensagemSucesso1.vue';
import { useStore } from 'vuex';
import criarCompromisso from '@/components/Modais/criarCompromisso.vue'
import { obterDiaDaSemana, obterHora, formatarData, formatHour } from '@/services/date'
import { formatarDataHora } from '@/services/date';
import { formatarDt } from '@/services/date';
const store = useStore()

const compromissos = computed(() => store.getters.compromissos);
console.log(compromissos.value)



function showNewCompromisso() {
    store.dispatch('setShowMNewCompromisso', true);
    console.log(store.state.controladoresTela.showMNewCompromisso)
}

function deletar(compromisso) {
    store.dispatch('excluirCompromisso', compromisso.id);

}

onBeforeMount(async () => {

    store.dispatch('listarCompromissos');

})


</script>