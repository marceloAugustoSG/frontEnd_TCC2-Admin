import axios from "axios";

// const apiUrl = process.env.VUE_APP_API_URL;
// Crie uma instância do Axios sem um token inicial
export const http = axios.create({
  // baseURL: "http:// 192.168.8.176:3005/",
  // baseURL: "https://apitcc.vercel.app/",
  // baseURL: "http://10.3.152.107:3005/",
  baseURL: "http://localhost:3005/"
});

// Adicione um interceptor para atualizar dinamicamente o cabeçalho de autorização
http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    // Se o token existir, adicione-o ao cabeçalho de autorização
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
