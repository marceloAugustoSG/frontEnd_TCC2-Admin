export default function tratarAgendamento(consulta) {
  if (consulta.profissionalId === null) {
    return "Escolha um profissional";
  } else if (consulta.data === "31/12/1969, 21:00") {
    return "Data indefinida";
  } else if (consulta.data === "") {
    return "Data indefinida";
  } else {
    // Caso nenhum dos casos acima seja verdadeiro, você pode retornar algo ou fazer outra coisa aqui
    return "Consulta válida";
  }
}
