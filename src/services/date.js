
export default function formatDate(data) {
    const dataObj = new Date(data);
    const dia = String(dataObj.getUTCDate()).padStart(2, '0');
    const mes = String(dataObj.getUTCMonth() + 1).padStart(2, '0');
    const ano = dataObj.getUTCFullYear();
    const hora = String(dataObj.getUTCHours()).padStart(2, '0');
    const minuto = String(dataObj.getUTCMinutes()).padStart(2, '0');

    const dataFormatada = `${dia}/${mes}/${ano} ${hora}:${minuto}`;
    return dataFormatada;
}