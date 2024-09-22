<template>
    <v-container fluid v-if="dataLoaded">
        <div style="margin: 0 30px">
            <v-row>
                <v-col cols="6">
                    <v-card class="mx-auto" color="card" elevation="1" border>
                        <h6 class="ma-5" style="text-align: center;">Agendamentos para HOJE</h6>
                        <v-carousel cycle progress="primary" :continuous="false" height="200" max-width="400"
                            show-arrows="hover" hide-delimiters>
                            <div v-if="consultasParaHoje.length === 0"
                                style="display: flex;align-items: center;justify-content: center;height: 100%">
                                <p>Não há consultas para HOJE</p>
                            </div>

                            <v-carousel-item v-else v-for="(consulta, id) in consultasParaHoje" :key="id">
                                <div class="d-flex fill-height justify-center ">
                                    <v-sheet
                                        style="background-color: transparent; display: flex;align-items: center; flex-direction: column; justify-content: center;height: 100%">

                                        <v-card-title>{{ consulta.servico }}</v-card-title>
                                        <v-card-subtitle><strong>Paciente:</strong>{{ consulta.Paciente.nome
                                            }}</v-card-subtitle>
                                        <v-card-subtitle><strong>Profissional:</strong>{{ consulta.Profissional.nome
                                            }}</v-card-subtitle>
                                    </v-sheet>
                                </div>
                            </v-carousel-item>
                        </v-carousel>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card class="mx-auto" color="card" elevation="1" border>
                        <h6 class="ma-5" style="text-align: center;">Agendamentos para AMANHÃ</h6>
                        <v-carousel cycle progress="primary" :continuous="false" height="200" max-width="400"
                            show-arrows="hover" hide-delimiters>
                            <div v-if="consultasParaAmanha.length === 0"
                                style="display: flex;align-items: center;justify-content: center;height: 100%">
                                <p>Não há consultas marcadas para AMANHÃ</p>
                            </div>

                            <v-carousel-item v-else v-for="(consulta, id) in consultasParaAmanha" :key="id">
                                <div class="d-flex fill-height justify-center ">
                                    <v-sheet
                                        style="background-color: transparent; display: flex;align-items: center; flex-direction: column; justify-content: center;height: 100%">

                                        <v-card-title>{{ consulta.servico }}</v-card-title>
                                        <v-card-subtitle><strong>Paciente:</strong>{{ consulta.Paciente.nome
                                            }}</v-card-subtitle>
                                        <v-card-subtitle><strong>Profissional:</strong>{{ consulta.Profissional.nome
                                            }}</v-card-subtitle>
                                    </v-sheet>
                                </div>
                            </v-carousel-item>
                        </v-carousel>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6">
                    <h2 style="text-align: center"> Serviço </h2>
                </v-col>
                <v-col cols=" 6">
                    <h2 style="text-align: center"> Status </h2>
                </v-col>
                <!-- <v-col cols="4">
                    <h2 style="text-align: center"> Curso </h2>
                </v-col> -->
            </v-row>
            <v-row>
                <v-col cols="6">
                    <GraficoRosca :dados="[consultasAtendimentoMedico, consultasAtendimentoPsicologico]"
                        :labels="['Atendimento Médico', 'Atendimento Psicológico']" :colors="['#004F00', '#093164']" />
                </v-col>
                <v-col cols="6">
                    <GraficoRosca :dados="[consultasSolicitadas, consultasConfirmadas, consultasCanceladas]"
                        :labels="['Solicitadas', 'Confirmadas', 'Canceladas']"
                        :colors="['#FF8C1D', '#46873A', '#F33D34']" />
                </v-col>
                <!-- <v-col cols="4">
                    <GraficoRosca :dados="[consultasSolicitadas, consultasConfirmadas, consultasCanceladas]"
                        :labels="['CEAE', 'CCENS', 'Nenhum']" :colors="['#FF8C1D', '#46873A', '#F33D34']" />
                </v-col> -->
            </v-row>

            <!-- <v-row >
                <h2>Centros</h2>
                <v-col cols="4">
                    <GraficoBar :dados="[consultasSolicitadas, consultasConfirmadas, consultasCanceladas]"
                        :labels="['', '']"
                        :colors="['#FF8C1D', '#46873A', '#F33D34', '#F34D34']" />

                </v-col>
            </v-row> -->
        </div>
    </v-container>
    <div v-else style="display: flex; align-items: center;justify-content: center">
        Carregando ...
    </div>
</template>

<script setup>
import { onBeforeMount, computed, ref } from "vue"
import { useStore } from "vuex"
import GraficoRosca from '@/components/DashBoard/graficos/GraficoRosca.vue'
const store = useStore()


const dataLoaded = ref(false)
const consultasParaHoje = computed(() => store.getters.consultasParaHoje)
const consultasParaAmanha = computed(() => store.getters.consultasParaAmanha)
const consultasAtendimentoMedico = computed(() => store.getters.consultasAtendimentoMedico.length)
const consultasAtendimentoPsicologico = computed(() => store.getters.consultasAtendimentoPsicologico.length)
const consultasSolicitadas = computed(() => store.getters.consultasSolicitadas.length)
const consultasConfirmadas = computed(() => store.getters.consultasConfirmadas.length)
const consultasCanceladas = computed(() => store.getters.consultasCanceladas.length)





onBeforeMount(async () => {

    await store.dispatch('listarConsultas')
    dataLoaded.value = true

})

</script>