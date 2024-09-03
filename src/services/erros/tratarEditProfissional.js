export default function tratarErroEditProf(profissional) {
  if (profissional.nome === "") {
    return "Campo nome precisa ser preenchido";
  } else if (profissional.email === "") {
    return "Campo email precisa ser preenchido";
  }
}
