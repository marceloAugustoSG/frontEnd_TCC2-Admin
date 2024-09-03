<template>
    <Doughnut :data="data" :options="options"  />
</template>

<script setup>


let props = defineProps({
    labels: Array,
    dados: Array,
    colors: Array


})
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend)

const data = {
    labels: props.labels,
    datasets: [
        {
            backgroundColor: props.colors,
            data: props.dados
        }
    ]
}

const options = {
    responsive: true,
    maintainAspectRatio: false
}



</script>