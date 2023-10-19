<template>
    <v-btn @click="logout">Voltar para o login</v-btn>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
const router = useRouter()
const store = useStore()
function logout() {
    store.dispatch('logout')
    router.push({ name: 'login' })
}
</script>

<style></style>