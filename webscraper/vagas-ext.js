function tokenize(sentence) {
    const cleanedSentence = sentence.replace(/[.,()-]/g, '').toLowerCase();
    const words = cleanedSentence.split(' ');
    return Array.from(new Set(words));
}

(function() {

  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  function get_vagas(url) {

      const stringsBloqueadas = ["Candidatou-se", "ex-alunos", "ex-aluno", "verification", "Visualizado", "Recrutando", "corresponde", "horas"]
      let lista = document.getElementsByClassName("scaffold-layout__list-container")[0].children
      for (idx in lista) {
          let id = lista[idx].dataset.occludableJobId
          let tokens = []
          let textoVaga = ""

          let texto = lista[idx].innerText.split('\n')
          texto = texto.filter((value, index, array) => array.indexOf(value) === index)
          texto = texto.filter(e => stringsBloqueadas.some(s => e.includes(s)) === false)

          for (let j = 0; j < texto.length; j++) {
              textoVaga = textoVaga + texto[j] + " "
              if (j!== 1) {
                  texto[j] = tokenize(texto[j])
              }
          }
          for (let idx in texto) {
              tokens = tokens.concat(texto[idx])
          }

          tokens = tokens.filter(e => e !== "")

          console.log(id, tokens, textoVaga)

           fetch("http://127.0.0.1:8000/api/vagas", {
                  method: "POST",
                  body: JSON.stringify({
                      id: id,
                      tokens: tokens,
                      txtVaga: textoVaga,
                      isEnabled: true
                  }),
                  headers: {
                      "Content-type": "application/json; charset=UTF-8"
                  }
              }).then(r => console.log(r));
      }
  }

  function reset(data) {
      console.log(data)
      alert(data)
  }

  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "get_vagas") {
      get_vagas(message.beastURL);
    } else if (message.command === "reset") {
      reset(message.data);
    }
  });

})();