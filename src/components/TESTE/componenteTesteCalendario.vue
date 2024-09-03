<template>
    <v-sheet class="pa-5 ma-5" rounded>
        <v-card class="pa-5" elevation="2">
            <div class="calendar-header">
                <v-btn text="<" @click="anterior" color="btn" variant="outlined" />
                <span>{{ meses[mesAtual] }} - {{ anoAtual }}</span>
                <v-btn text=">" @click="proximo" color="btn" variant="outlined" />
            </div>

        </v-card>
        <v-card class="pa-5 mt-5" elevation="1">
            <div class="calendar-body">

                <div class="calendar-day" v-for="dia in daysInMonth" :key="dia" @click="abrirMDetalhesConsulta(dia)">
                    {{ dia }}
                    <div v-if="temConsulta(dia)" class="consulta-indicador"></div>


                </div>
                <!-- <v-dialog v-model="dialogTeste" persistent max-width="800px">
                    <v-card>
                        <v-card-title class="headline">Detalhes da Consulta</v-card-title>
                        <v-card-text>
                            <div v-if="consultaSelecionada">
                                <p><strong>Data:</strong> {{ consultaSelecionada.data }}</p>
                                <p><strong>Status:</strong> {{ consultaSelecionada.status }}</p>
                                <p><strong>Paciente:</strong> {{ consultaSelecionada.paciente }}</p>
                                <p><strong>Profissional de Saúde:</strong> {{ consultaSelecionada.profissionalSaude }}
                                </p>
                            </div>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn @click="fechar()">Fechar</v-btn>
                        </v-card-actions>
                    </v-card>

                </v-dialog> -->

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
                                                <p><strong>Paciente:</strong> {{ consulta.paciente }}</p>
                                                <p><strong>Profissional de Saúde:</strong> {{ consulta.profissionalSaude
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


const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
const mesAtual = ref(new Date().getMonth())
const anoAtual = ref(new Date().getFullYear())
let dialogTeste = ref(false);
const store = useStore();

const consultasParaHoje = ref([]);

// const consultaSelecionada = ref(null);

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

const consultasProfissional = computed(() => store.state.agendamento.consultasProfissional);



const fechar = () => {
    dialogTeste.value = !dialogTeste.value
}

// const abrirMDetalhesConsulta = (dia) => {
//     const dataFormatada = `${dia.toString().padStart(2, '0')}/${(mesAtual.value + 1).toString().padStart(2, '0')}/${anoAtual.value}`;
//     // alert(dataFormatada);
//     console.log(temConsulta(dia))

//     temConsulta(dia) ? dialogTeste.value = true : dialogTeste.value = false


//     //chamar uma action que busca as consultas pela data,e dai com isso, preenche o objeto de consulta e renderiza o modal de detalhes
//     //caso for mais de uma consulta, usarei o componente de slide que estou usando no página inicial 
// }




// const abrirMDetalhesConsulta = (dia) => {
//     const dataFormatada = `${dia.toString().padStart(2, '0')}/${(mesAtual.value + 1).toString().padStart(2, '0')}/${anoAtual.value}`;

//     const consulta = consultasMock.value.find(consulta => consulta.data === dataFormatada);

//     if (consulta) {
//         consultaSelecionada.value = consulta;
//         dialogTeste.value = true;
//     } else {
//         consultaSelecionada.value = null;
//         dialogTeste.value = false;
//     }
// };



const abrirMDetalhesConsulta = (dia) => {
    const dataFormatada = `${dia.toString().padStart(2, '0')}/${(mesAtual.value + 1).toString().padStart(2, '0')}/${anoAtual.value}`;

    consultasParaHoje.value = consultasMock.value.filter(consulta => consulta.data === dataFormatada);

    if (consultasParaHoje.value.length > 0) {
        dialogTeste.value = true;
    } else {
        dialogTeste.value = false;
    }
};

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

    await store.dispatch('getConsultaProfissional', 75)

    console.log(store.state.agendamento.consultasProfissional);

})


const daysInMonth = computed(() => {
    return new Date(anoAtual.value, mesAtual.value + 1, 0).getDate();
});


const temConsulta = (dia) => {
    const dataFormatada = `${dia.toString().padStart(2, '0')}/${(mesAtual.value + 1).toString().padStart(2, '0')}/${anoAtual.value}`;
    console.log(dataFormatada)
    return consultasMock.value.some(consulta => consulta.data === dataFormatada);
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