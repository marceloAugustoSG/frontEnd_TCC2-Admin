
// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";
import { VDataIterator } from 'vuetify/lib/components/VDataIterator/VDataIterator';
import enUS from 'date-fns/locale/en-US'


const ligth = {
  dark: false,
  colors: {
    background: "#d2d3db",
    card: "#0F406F",
    surface: "#EEE",
    primary: "#0D3E6D",
    secundary: "#12AF83",
    "primary-darken-1": "#0D3E6D",
    "secondary-darken-1": "#018786",
    'hover': '#C47070',
    error: "#F3022E",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FB8C00",
    create: "#4CAF50",
    btn: "#0C3D6C"
  },
};
const dark = {
  colors: {
    background: "#333333",
    surface: "#333333",
    card: "#0F406F",
    primary: "#0D3E6D",
    secundary: "#12AF83",
    "primary-darken-1": "#0D3E6D",
    "secondary-darken-1": "#018786",
    'hover': '#FFD700',
    error: "#F3022E",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FB8C00",
    create: "#4CAF50",
  },
};

export default createVuetify({
  date: {

    locale: {
      en: enUS,
    }
  }, components: {
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