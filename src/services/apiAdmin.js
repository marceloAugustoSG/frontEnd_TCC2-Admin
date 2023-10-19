import { http } from "./axiosConfig";
export default {
    listarConsultas: () => {
        return http.get("consultas")
    }
}
