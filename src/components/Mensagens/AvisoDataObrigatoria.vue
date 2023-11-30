<v-dialog v-model="dialogErro">
    <v-card class=" mx-auto" style="width: 400px;">
        <v-toolbar title="Aviso" color="primary" />
        <v-card-text>
            Forneça uma data e horario para a consulta
        </v-card-text>
        <v-card-actions>
            <v-spacer />
            <v-btn @click="fecharDialogErro" text="OK" />
        </v-card-actions>
    </v-card>

</v-dialog>