
function tokenize(sentence) {
    const cleanedSentence = sentence.replace(/[.,()-]/g, '').toLowerCase();
    const words = cleanedSentence.split(' ');
    return Array.from(new Set(words));
}

document.onkeydown = function(evt) {
    if (!evt.ctrlKey) {
      return;
    }

    const stringsBloqueadas = ["Candidatou-se", "ex-alunos", "ex-aluno", "verification", "Visualizado", "Recrutando", "corresponde", "horas"]
      let lista = document.getElementsByClassName("scaffold-layout__list-container")[0].children
      for (idx in lista) {
          let id = lista[idx].dataset.occludableJobId
          let textoVaga = ""

          let texto = lista[idx].innerText.split('\n')
          texto = texto.filter((value, index, array) => array.indexOf(value) === index)
          texto = texto.filter(e => stringsBloqueadas.some(s => e.includes(s)) === false)
          empresa = ''

          for (let j = 0; j < texto.length; j++) {
              if (j === 1) {
                  empresa = texto[j]
                  continue
              }

              textoVaga = textoVaga + texto[j] + " "
              texto[j] = tokenize(texto[j])
          }

           fetch("http://127.0.0.1:8000/api/vagas", {
                  method: "POST",
                  body: JSON.stringify({
                      id: id,
                      txtVaga: textoVaga,
                      isEnabled: true,
                      empresa: empresa
                  }),
                  headers: {
                      "Content-type": "application/json; charset=UTF-8"
                  }
              }).then(r => console.log(r));
      }
};
