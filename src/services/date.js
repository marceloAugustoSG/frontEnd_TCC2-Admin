
// export default function formatDate(data) {


//     const dataObj = new Date(data);
//     const dia = String(dataObj.getUTCDate()).padStart(2, '0');
//     const mes = String(dataObj.getUTCMonth() + 1).padStart(2, '0');
//     const ano = dataObj.getUTCFullYear();
//     const hora = String(dataObj.getUTCHours()).padStart(2, '0');
//     const minuto = String(dataObj.getUTCMinutes()).padStart(2, '0');

//     const dataFormatada = `${dia}/${mes}/${ano} ${hora}:${minuto}`;
//     return dataFormatada;
// }

export default function formatDate(data) {
    const options = {
        timeZone: 'America/Sao_Paulo',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    };

    const dataObj = new Date(data);
    const dataFormatada = dataObj.toLocaleString('pt-BR', options);
    return dataFormatada;
}