<template>
  <v-container>

    <v-row class="cabecalho">
      <v-col cols="12">
        <h2>Meu Perfil</h2>
      </v-col>
    </v-row>
    <v-spacer></v-spacer>
    <v-row>
      <v-col cols="12" sm="12">
        <form @submit.prevent="atualizarPerfil">
          <v-text-field label="Nome" />
          <v-text-field label="Nome" />
          <v-btn text="Atualizar" class="w-100" />
        </form>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
export default {};
</script>

<style>
.cabecalho {
  text-align: center;
}
</style>
