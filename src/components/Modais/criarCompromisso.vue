<template>

    <v-sheet class="pa-5">
        <v-card-title>
            <span class="text-h5">Novo Compromisso</span>
        </v-card-title>

        <v-container>
            <v-form ref="form">

                <v-row>
                    <v-col cols="12" lg="12">
                        <v-text-field variant="outlined" v-model="novoCompromisso.tituloCompromisso" label="Título"
                            :rules="tituloRules" required />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" lg="12">
                        <v-text-field type="date" v-model="novoCompromisso.dataCompromisso" label="Data"
                            variant="outlined" :rules="dataRules" required />
                    </v-col>


                </v-row>
                <v-row>
                    <v-col cols="12" lg="6">
                        <v-text-field type="time" v-model="novoCompromisso.horaInicio" label="Horário de Início"
                            variant="outlined" :rules="horarioInicioRules" required />
                    </v-col>
                    <v-col cols="12" lg="6">
                        <v-text-field type="time" v-model="novoCompromisso.horaFim" label="Horário de Fim"
                            variant="outlined" :rules="horarioFimRules" required />
                    </v-col>


                </v-row>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="submit" variant="flat" color="create" text="Salvar" />
                    <v-btn @click="close" color="#FF6B6B" variant="flat" text="Fechar" />
                </v-card-actions>
            </v-form>
        </v-container>



    </v-sheet>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore()


const novoCompromisso = ref({
    tituloCompromisso: '',
    dataCompromisso: '',
    horaInicio: '',
    horaFim: '',
    profissionalId: Number(localStorage.getItem('profissionalId'))
})
const tituloRules = [
    value => {
        if (value) return true

        return 'Campo título não pode ser vazio'
    },
]
const dataRules = [
    value => {
        if (value) return true

        return 'Campo data não pode ser vazio'
    },
]
const horarioInicioRules = [
    value => {
        if (value) return true

        return 'Campo Horário de Início não pode ser vazio'
    },
]


const horarioFimRules = [
    value => {
        if (value) return true;
        return 'Campo de Horário de fim não pode ser vazio';
    },
    value => {
        if (value && novoCompromisso.value.horaInicio) { // Use .value para acessar o valor de novoCompromisso
            const inicio = novoCompromisso.value.horaInicio; // Corrigido para acessar horario_inicio
            const fim = value;

            // Converter horários para minutos (HH:mm)
            const [inicioHoras, inicioMinutos] = inicio.split(':').map(Number);
            const [fimHoras, fimMinutos] = fim.split(':').map(Number);

            const totalInicio = inicioHoras * 60 + inicioMinutos;
            const totalFim = fimHoras * 60 + fimMinutos;

            if (totalFim >= totalInicio) {
                return true;
            } else {
                return 'Horário de fim não pode ser menor que o horário de início';
            }
        }
        return true;
    }
];





const form = ref(null);
function formatToISO(date, time) {
    const [hours, minutes] = time.split(':');
    const formattedDate = new Date(date);
    formattedDate.setHours(hours, minutes, 0, 0);
    return formattedDate.toISOString(); // Retorna no formato ISO
}

async function submit() {
    const isValid = await form.value.validate();

    if (isValid.valid) {
        // Converte dataCompromisso, horaInicio e horaFim para o formato ISO
        const dataISO = new Date(novoCompromisso.value.dataCompromisso).toISOString();
        const horaInicioISO = formatToISO(novoCompromisso.value.dataCompromisso, novoCompromisso.value.horaInicio);
        const horaFimISO = formatToISO(novoCompromisso.value.dataCompromisso, novoCompromisso.value.horaFim);

        // Atualiza os valores do compromisso com os formatos corretos
        const compromissoFormatado = {
            ...novoCompromisso.value,
            dataCompromisso: dataISO,
            horaInicio: horaInicioISO,
            horaFim: horaFimISO
        };


        store.dispatch('criarCompromisso', compromissoFormatado);
        store.dispatch('listarCompromissos');
        close();
        // store.dispatch('setMsgSaveProf', true);
    } else {
        console.log('Form is not valid');
        return;
    }
}

function close() {

    store.dispatch('setShowMNewCompromisso', false);
}

</script>