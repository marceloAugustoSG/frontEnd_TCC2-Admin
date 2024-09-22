// Exportando a função formatDate
export function formatDate(data) {
  const options = {
    timeZone: "America/Sao_Paulo",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const dataObj = new Date(data);
  const dataFormatada = dataObj.toLocaleString("pt-BR", options);
  console.log(dataFormatada);
  return dataFormatada;
}

// Exportando a função converterDataParaUTC
export function converterDataParaUTC(dataFornecida) {
  // Divida a string para obter dia, mês, ano e hora
  var partes = String(dataFornecida).split(/[\s,/:]+/);
  var dia = partes[0];
  var mes = partes[1];
  var ano = partes[2];
  var hora = partes[3];
  var minutos = partes[4];
  // Construa um objeto Date com as partes extraídas
  var data = new Date(ano, mes - 1, dia, hora, minutos);
  // Converta para UTC
  var dataUTC = data.toISOString();
  return dataUTC;
}

export function formatarDataHora(dataHoraISO) {
  // Data recebida
  const dataHoraRecebida = new Date(dataHoraISO);

  // Extrair informações da data
  const dia = dataHoraRecebida.getUTCDate();
  const mes = dataHoraRecebida.getUTCMonth() + 1; // Adicionando 1 porque os meses são indexados a partir de 0
  const ano = dataHoraRecebida.getUTCFullYear();

  // Extrair informações da hora
  const horas = dataHoraRecebida.getUTCHours();
  const minutos = dataHoraRecebida.getUTCMinutes();

  // Formatar a data no formato dd/mm/aaaa e hora no formato hh:mm
  const dataFormatada = `${dia.toString().padStart(2, "0")}/${mes
    .toString()
    .padStart(2, "0")}/${ano}`;
  const horaFormatada = `${horas.toString().padStart(2, "0")}:${minutos
    .toString()
    .padStart(2, "0")}`;

  let dataFormatadaT = `${dataFormatada},${horaFormatada}`;

  return dataFormatadaT;
}


export function obterDiaDaSemana(dataISO) {
  // Cria um objeto Date a partir da data no formato ISO
  const data = new Date(dataISO);

  // Array com os nomes dos dias da semana
  const diasSemana = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];

  // Retorna o nome do dia da semana correspondente
  return diasSemana[data.getUTCDay()];
}


export function obterHora(dataISO) {
  // Cria um objeto Date a partir da data no formato ISO
  const data = new Date(dataISO);

  // Pega as horas e minutos
  let horas = data.getUTCHours();
  let minutos = data.getUTCMinutes();

  // Adiciona zero à esquerda se horas ou minutos forem menores que 10
  horas = horas < 10 ? '0' + horas : horas;
  minutos = minutos < 10 ? '0' + minutos : minutos;

  // Retorna o horário no formato hh:mm
  return `${horas}:${minutos}`;
}

export function formatarData(data) {
  const dataObj = new Date(data);

  // Obter componentes da data usando métodos UTC
  const dia = String(dataObj.getUTCDate()).padStart(2, '0');
  const mes = String(dataObj.getUTCMonth() + 1).padStart(2, '0'); // Mês começa em 0
  const ano = dataObj.getUTCFullYear();

  const dataFormatada = `${dia}/${mes}/${ano}`;
  console.log(dataFormatada);
  return dataFormatada;
}



export function formatHour(data) {
  const dataObj = new Date(data);

  // Configurações para o fuso horário de São Paulo
  const options = {
    timeZone: "America/Sao_Paulo",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  // Formata a hora
  const horaFormatada = dataObj.toLocaleTimeString("pt-BR", options);
  console.log(horaFormatada);
  return horaFormatada;
}


export function formatarDt(dataHoraISO) {
  // Data recebida
  const dataHoraRecebida = new Date(dataHoraISO);

  // Extrair informações da data
  const dia = dataHoraRecebida.getUTCDate();
  const mes = dataHoraRecebida.getUTCMonth() + 1; // Adicionando 1 porque os meses são indexados a partir de 0
  const ano = dataHoraRecebida.getUTCFullYear();

  // Extrair informações da hora
  const horas = dataHoraRecebida.getUTCHours();
  const minutos = dataHoraRecebida.getUTCMinutes();

  // Formatar a data no formato dd/mm/aaaa e hora no formato hh:mm
  const dataFormatada = `${dia.toString().padStart(2, "0")}/${mes
    .toString()
    .padStart(2, "0")}/${ano}`;
  const horaFormatada = `${horas.toString().padStart(2, "0")}:${minutos
    .toString()
    .padStart(2, "0")}`;

  let dataFormatadaT = `${dataFormatada}`;

  return dataFormatadaT;
}
