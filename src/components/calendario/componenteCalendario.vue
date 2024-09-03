<template>


    <v-sheet class="pa-5 ma-5" rounded>

        <v-btn text="Voltar" @click="voltarNvegacao" color="btn" variant="outlined" style="margin: 20px;" />
        <v-card class="pa-5" elevation="2">
            <div class="calendar-header">
                <v-btn text="◀" @click="anterior" color="btn" variant="flat" />
                <span>{{ meses[mesAtual] }} - {{ anoAtual }}</span>
                <v-btn text="▶" @click="proximo" color="btn" variant="flat" />
            </div>

        </v-card>
        <v-card class="pa-5 mt-5" elevation="1">
            <div class="calendar-body">

                <div class="calendar-day" v-for="dia in daysInMonth" :key="dia" @click="abrirMDetalhesConsulta(dia)">
                    {{ dia }}
                    <div v-if="temConsulta(dia)" class="consulta-indicador"></div>
                </div>

                <v-dialog v-model="dialogTeste" persistent max-width="1000px">
                    <v-card>
                        <v-card-title class="headline">Detalhes da Consulta</v-card-title>
                        <v-card-text>
                            <v-carousel v-if="consultasParaHoje.length > 1" show-arrows>
                                <v-carousel-item v-for="(consulta, id) in consultasParaHoje" :key="id">
                                    <div class="d-flex fill-height justify-center align-center ">
                                        <v-card width="50%" height="50%" class="d-flex justify-center align-center ">
                                            <v-card-text>
                                                <p><strong>Data:</strong> {{ consulta.data }}</p>
                                                <p><strong>Status:</strong> {{ consulta.status }}</p>
                                                <p><strong>Paciente:</strong> {{ consulta.Paciente.nome }}</p>
                                                <p><strong>Profissional de Saúde:</strong> {{ consulta.Profissional.nome
                                                    }}
                                                </p>
                                            </v-card-text>
                                        </v-card>

                                    </div>
                                </v-carousel-item>
                            </v-carousel>

                            <div v-else>
                                <p><strong>Data:</strong> {{ consultasParaHoje[0].data }}</p>
                                <p><strong>Status:</strong> {{ consultasParaHoje[0].status }}</p>
                                <p><strong>Paciente:</strong> {{ consultasParaHoje[0].paciente }}</p>
                                <p><strong>Profissional de Saúde:</strong> {{ consultasParaHoje[0].profissionalSaude }}
                                </p>
                            </div>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer />
                            <v-btn @click="fechar()" variant="tonal">Fechar</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>


            </div>

        </v-card>
    </v-sheet>
</template>

<script setup>
import { useStore } from "vuex";
import { ref, computed, onBeforeMount } from "vue";
import router from "@/router";


const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
const mesAtual = ref(new Date().getMonth())
const anoAtual = ref(new Date().getFullYear())
let dialogTeste = ref(false);
const store = useStore();

const consultasParaHoje = ref([]);


const consultasMock = ref([

    {
        data: '12/08/2024',
        status: 'Solicitado',
        paciente: 'Marcelo Augusto Soares Gomes',
        profissionalSaude: 'Dr Ricardo Moreira'
    },
    {
        data: '12/08/2024',
        status: 'Confirmado',
        paciente: 'Marcelo Augusto Soares Gomes',
        profissionalSaude: 'Dr Ricardo Moreira'
    },
    {
        data: '13/08/2024',
        status: 'Solicitado',
        paciente: 'Marcelo Augusto Soares Gomes',
        profissionalSaude: 'Dr Ricardo Moreira'
    },
    {
        data: '13/07/2024',
        status: 'Solicitado',
        paciente: 'Marcelo Augusto Soares Gomes',
        profissionalSaude: 'Dr Ricardo Moreira'
    }
])

const consultasProfissional = ref([])




const fechar = () => {
    dialogTeste.value = !dialogTeste.value
}





const abrirMDetalhesConsulta = (dia) => {
    // Formata o dia selecionado para o formato 'dd/MM/yyyy'
    const dataFormatada = `${dia.toString().padStart(2, '0')}/${(mesAtual.value + 1).toString().padStart(2, '0')}/${anoAtual.value}`;

    // Filtra as consultas para a data formatada
    consultasParaHoje.value = consultasProfissional.value.filter(consulta => {
        // Converte a data ISO da consulta para o formato 'dd/MM/yyyy'
        const dataConsulta = new Date(consulta.data).toLocaleDateString('pt-BR');
        return dataConsulta === dataFormatada;
    });

    // Abre ou fecha o diálogo com base no resultado do filtro
    dialogTeste.value = consultasParaHoje.value.length > 0;
};

const voltarNvegacao = () => {
    router.push('/profissionais');

}

const anterior = () => {
    if (mesAtual.value === 0) {

        mesAtual.value = 11;
        anoAtual.value--;
    } else {
        mesAtual.value--
    }

}


const proximo = () => {
    if (mesAtual.value === 11) {

        mesAtual.value = 0;
        anoAtual.value++;
    } else {
        mesAtual.value++
    }

}

onBeforeMount(async () => {

    await store.dispatch('getConsultaProfissional', store.state.profissionais.idProfissionalSelecionado)
    consultasProfissional.value = store.state.agendamento.consultasProfissional.consultas
    console.log(store.state.agendamento.consultasProfissional.consultas);
    console.log(consultasProfissional.value);

})


const daysInMonth = computed(() => {
    return new Date(anoAtual.value, mesAtual.value + 1, 0).getDate();
});




const temConsulta = (dia) => {
    console.log(dia);
    // Formata a data no formato 'dd/MM/yyyy'
    const dataFormatada = `${dia.toString().padStart(2, '0')}/${(mesAtual.value + 1).toString().padStart(2, '0')}/${anoAtual.value}`;
    console.log(dataFormatada);

    return consultasProfissional.value.some(consulta => {
        // Converte a data ISO para o formato 'dd/MM/yyyy'
        const dataConsulta = new Date(consulta.data).toLocaleDateString('pt-BR');
        return dataConsulta === dataFormatada;
    });
};

</script>

<style>
.calendar {
    background-color: black;
}

.calendar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.calendar-body {
    margin: 30px 0;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 10px;
    width: 100%;
    max-width: 100%;
}


.calendar-day {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
    border: 1px solid #3191EE;
    border-radius: 5px;
    padding: 10px;
    display: flex;
    flex-direction: column;
}

.consulta-indicador {
    width: 8px;
    height: 8px;
    background-color: orange;
    border-radius: 50%;
}
</style>