<template>
    <v-card class="mt-3" min-width="300">
        <v-list>
            <v-list-item v-if="props.notificacoes.length === 0">
                <v-list-item-title class="d-flex align-center justify-space-between">
                    <p>Nenhuma notificação</p>
                </v-list-item-title>
            </v-list-item>

            <v-list-item v-else v-for="(notificacao, index) in notificacoes" :key="index" :value="index">
                <v-list-item-title class="d-flex align-center justify-space-between">{{ notificacao.title }}
                    <v-btn @click="apagarNotificacao(index)">X</v-btn>
                </v-list-item-title>
            </v-list-item>
        </v-list>
    </v-card>
</template>

<script setup>
const props = defineProps(
    {
        notificacoes: Array
    }
)
function apagarNotificacao(index) {
    props.notificacoes.splice(index, 1)
}


</script>

<style></style>