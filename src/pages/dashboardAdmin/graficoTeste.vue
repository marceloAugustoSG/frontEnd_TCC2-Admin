<template>
    <div>
        <canvas ref="myChart" width="800"></canvas>
    </div>
</template>
  
<script setup>
import { onMounted, ref } from 'vue';
import Chart from 'chart.js/auto';
import { useStore } from 'vuex';

const store = useStore()

const myChart = ref(null);

onMounted(() => {

    const consultaConfirmadas = store.state.consultas.filter(consulta => consulta.status === 'Confirmada').length
    const consultasSolicitadas = store.state.consultas.filter(consulta => consulta.status === 'Solicitada').length;
    const consultasCanceladas = store.getters.consultas.filter(consulta => consulta.status === 'Cancelada').length;
    const atendimentoMedico = store.state.consultas.filter(consulta => consulta.servico === 'Atendimento Médico').length;
    const atendimentoPsicologico = store.state.consultas.filter(consulta => consulta.status === 'Atendimento Psicológico').length;
    const ctx = myChart.value.getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Solicitadas', 'Confirmadas', 'Canceladas'],
            datasets: [
                {
                    label: 'Consultas',
                    data: [ consultaConfirmadas, ],
                    backgroundColor: ['rgba(255,152,0.1)',],
                    borderColor: ['rgba(255,152,0.7)',]
                },
                {
                    label: 'teste',
                    data: [consultasSolicitadas],
                    backgroundColor: 'trasparent',
                    borderColor: ['rgba(255,152,0.7)',]
                },
            ],
        },
        options: {
            responsive: false,
            scales: {
                y: {
                    beginAtZero: true
                }

            }
        }
    });
});
</script>
   

 