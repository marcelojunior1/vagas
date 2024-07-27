
let tokens = []

let txt = document.getElementsByClassName("job-details-jobs-unified-top-card__job-insight job-details-jobs-unified-top-card__job-insight--highlight")[0]
txt = txt.textContent

if (txt.includes("Híbrido")) tokens.push("Híbrido")
if (txt.includes("Tempo integral")) tokens.push("Tempo integral")
if (txt.includes("Pleno-sênior")) tokens.push("Pleno-sênior")
if (txt.includes("Júnior")) tokens.push("Júnior")
if (txt.includes("Remoto")) tokens.push("Remoto")
if (txt.includes(" Assistente ")) tokens.push(" Assistente ")
if (txt.includes(" Presencial ")) tokens.push(" Presencial ")

let id = window.location.pathname.replace("/jobs/view/", "").replace("/", "")

var vaga = fetch("http://127.0.0.1:8000/api/vagas/" + id)
    .then((response) => response.json())
    .then((json) => {
        vaga = json.data;
        for (let token of tokens) {
            if (vaga.tokens.indexOf(token) < 0) {
                vaga.tokens.push(token)
                vaga.txtVaga = vaga.txtVaga + '\n' + token;
            }
        }
        vaga.isEnabled = true
        return vaga
    });

vaga.then(v => {
    fetch("http://127.0.0.1:8000/api/vagas/" + id, {
                  method: "PUT",
                  body: JSON.stringify({
                      tokens: v.tokens,
                      txtVaga: v.txtVaga,
                      isEnabled: true
                  }),
                  headers: {
                      "Content-type": "application/json; charset=UTF-8"
                  }
              }).then(r => window.close());
})