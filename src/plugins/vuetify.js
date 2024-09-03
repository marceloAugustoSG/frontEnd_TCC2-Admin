// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";
import { VDataIterator } from "vuetify/lib/components/VDataIterator/VDataIterator";
import enUS from "date-fns/locale/en-US";
import ptBR from "date-fns/locale/pt-BR";

const ligth = {
  dark: false,
  colors: {
    blueUfes: '#F0F2F5',
    colorIcons: "0F406F",
    background: "#fff",
    // card: "#0F406F",
    card: "#EEE",
    surface: "#EEE",
    primary: "#eee",
    secundary: "#12AF83",
    "primary-darken-1": "#0D3E6D",
    "secondary-darken-1": "#018786",
    hover: "#C47070",
    error: "#F3022E",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FB8C00",
    create: "#4CAF50",
    btn: "#0C3D6C",
  },
};
const dark = {
  colors: {
    blueUfes: '#F0F2F5',
    colorIcons: "#2F99EE",
    background: "#333333",
    surface: "#333333",
    // card: "#0F406F",
    card: "#4c4c4c",
    primary: "#333333",
    secundary: "#12AF83",
    "primary-darken-1": "#0D3E6D",
    "secondary-darken-1": "#018786",
    hover: "#FFD700",
    error: "#F3022E",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FB8C00",
    create: "#4CAF50",
    btn: "#3191EE",
  },
};

export default createVuetify({
  date: {
    locale: {
      en: enUS,
      pt: ptBR,
    },
  },
  components: {
    VDataIterator,
  },

  theme: {
    defaultTheme: "dark",
    themes: {
      ligth,
      dark,
    },
  },
});
