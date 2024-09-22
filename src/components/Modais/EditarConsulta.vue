<template>
    <p>{{ store.state.agendamento.idConsultaState }}</p>
    <v-sheet class=" mx-auto" style="width:  1000px;" border rounded>
        <v-toolbar color="primary" :title="!ativarEdicao ? 'Editar consulta' : 'Detalhes da Consulta'">
            <v-btn icon @click="EnabledEdit()" :disabled="props.consulta.status === 'Confirmada' ||props.consulta.status === 'Cancelada' || psi === 'false'">
                <v-icon :icon="!ativarEdicao ? 'mdi-pencil-off' : 'mdi-pencil'" />
            </v-btn>
        </v-toolbar>
        <form @submit.prevent="submit">
            <v-sheet border rounded class="ma-2 pa-2">
                <h3 class="ml-5"> Paciente</h3>
                <v-row class="ma-3">
                    <v-col cols="12" lg="4">
                        <v-text-field label="Nome" variant="outlined" v-model="props.consulta.Paciente.nome" disabled />
                    </v-col>
                    <v-col cols="12" lg="4">
                        <v-text-field label="Vínculo" variant="outlined"
                            v-model="store.state.agendamento.consulta.Paciente.tipo" disabled />
                    </v-col>
                    <v-col cols="12" lg="4">
                        <v-text-field label="Matricula" variant="outlined"
                            v-model="store.state.agendamento.consulta.Paciente.matricula" disabled />
                    </v-col>
                    <v-col cols="12" lg="4">
                        <v-text-field label="Telefone" variant="outlined"
                            v-model="store.state.agendamento.consulta.Paciente.telefone" disabled />
                    </v-col>
                    <v-col cols="12" lg="4">
                        <v-text-field label="Curso" variant="outlined"
                            v-model="store.state.agendamento.consulta.Paciente.curso" disabled />
                    </v-col>
                </v-row>
            </v-sheet>
            <v-divider class="ma-5" />
            <v-sheet border rounded class="ma-2 pa-2">
                <h3 class="ml-5"> Informações para a Consulta</h3>
                <v-row class="ma-3">
                    <v-col cols="12" lg="4">
                        <v-text-field label="Serviço" variant="outlined"
                            v-model="store.state.agendamento.consulta.servico" disabled />
                        <v-textarea rows="1" label="Observação" variant="outlined"
                            v-model="store.state.agendamento.consulta.observacao" :items="selectTipos" disabled />
                    </v-col>
                    <v-col cols="12" lg="4">
                        <v-select label="Status" variant="outlined" v-model="store.state.agendamento.consulta.status"
                            :items="selectTipos" item-value="" :disabled="ativarEdicao" :item-title="item"
                            @update:model-value="habilitarCampoData(store.state.agendamento.consulta.status)" />






                        <v-text-field v-if="props.consulta.status === 'Confirmada'"
                            :type="ativarEdicao ? 'text' : 'datetime-local'" label="Data e Horário para a consulta"
                            v-model="store.state.agendamento.consulta.data" variant="outlined" :disabled="ativarEdicao"
                            :min="minDate" />


                        <v-text-field v-else type="datetime-local" variant="outlined"
                            label="Data e Horário para a consulta" v-model="store.state.agendamento.consulta.data"
                            :disabled="habilitarCData" />

                     

                    </v-col>
                    <v-col cols="12" lg="4">
                        <v-select label="Profissional" variant="outlined" v-model="profissional" :items="formattedItems"
                            :item-value="item => item.id" :item-title="item => item.title"
                            :item-subtitle="item => item.subtitle" :disabled="ativarEdicao"
                            @update:model-value="trocarSelectTeste" />


                        <v-text-field label="Data de Solicitação" type="datetime-local" variant="outlined"
                            v-model="dataSolicitacao" disabled />
                    </v-col>

                    <v-col cols="12" lg="4">


                    </v-col>
                </v-row>
            </v-sheet>
            <v-row class="ma-3">
                <v-col>
                </v-col>
            </v-row>
            <v-card-item>
                <v-card-actions>
                    <v-spacer />
                    <v-btn
                        v-show="store.state.agendamento.consulta.servico === 'Atendimento Psicológico' && psi === 'false'"
                        text="Ver Respostas Confidências" @click="showDialogRespostas" variant="outlined" />
                    <v-btn class="mr-5" text="Agendar" variant="flat" color="#28A745" @click="salvar"
                        :disabled="ativarEdicao" />
                    <v-btn @click="fecharDialog" text="Fechar" variant="flat" color="#FF6B6B" />
                </v-card-actions>
            </v-card-item>
        </form>
    </v-sheet>
</template>

<script setup>
import { defineProps, ref, computed } from 'vue';
import { useStore } from 'vuex';
const store = useStore()

const dataSolicitacao = computed(() => {
    const data = store.state.agendamento.consulta.data_solicitacao;
    if (data) {
        const localDate = new Date(data).toLocaleString('sv-SE', { timeZone: 'America/Sao_Paulo' }); // Ajuste para o fuso horário desejado
        return localDate.replace(' ', 'T'); // Converte para o formato YYYY-MM-DDTHH:MM
    }
    return '';
});




const minDate = ref(new Date().toISOString().slice(0, 16));

const psi = localStorage.getItem('psi')
const props = defineProps({
    consulta: Object
})


//Variáveis e constantes
let habilitarCData = ref(true)
let ativarEdicao = ref(true)
let showRespostas = ref(false)
const profissional = ref('')
profissional.value = props.consulta.Profissional ? props.consulta.Profissional.nome : 'Profissional Indefinido'
console.log(profissional.value)
const selectTipos = ref(['Confirmada'])


//Funções da tela

function habilitarCampoData(item) {

    if (item === 'Confirmada') {
        habilitarCData.value = false
    } else {
        habilitarCData.value = true
    }
}


const formattedItems = computed(() => {
    const servico = props.consulta.servico
    let profissionais = [];

    if (servico === 'Atendimento Médico') {
        profissionais = store.getters.profissionaisMedicos;
    } else if (servico === 'Atendimento Psicológico') {
        profissionais = store.getters.profissionaisPsicologicos;
    }

    // Transformando os dados para o formato { title, subtitle }
    return profissionais.map(profissional => ({
        id: profissional.id,
        title: profissional.nome,
        subtitle: profissional.especialidade // Ou qualquer outro campo que deseja usar como subtitle
    }));
});


function trocarSelectTeste(item) {
    store.dispatch('setProfissionalId', item)
    console.log(store.state.agendamento.consulta)
    console.log(item)
}

async function fecharDialog() {

    // dialog.value = !dialog.value
    store.dispatch('setShowEditarConsulta', false)
    ativarEdicao.value = true
    console.log('fechar modal de editar agendamento')
    store.dispatch('listarConsultas');

}


function EnabledEdit() {
    ativarEdicao.value = !ativarEdicao.value
}

function showDialogRespostas() {
    store.dispatch('resposta')
    showRespostas.value = true
}


async function salvar() {
    try {
        await store.dispatch('agendarConsulta');
    } catch (error) {
        // Lógica para lidar com o erro
        store.dispatch('setShowAlertErrorAgendarConsulta', true);
    }
}


</script>

<style></style>