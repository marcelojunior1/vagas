
document.onkeydown = function(evt) {
    if (!evt.ctrlKey) {
      return;
    }

    const stringsBloqueadas = ["Candidatou-se", "ex-alunos", "ex-aluno", "verification", "Visualizado", "Recrutando", "corresponde", "horas"]
    let lista = document.getElementsByClassName("scaffold-layout__list-container")[0].children

    for (let idx in lista) {
        let id = lista[idx].dataset.occludableJobId
        let array_texto = lista[idx].innerText.split('\n')
        array_texto.splice(1,1)
        array_texto = array_texto.filter(e => stringsBloqueadas.some(s => e.includes(s)) === false)

        let texto = array_texto.reduce((accumulator, current) => accumulator + '\n' + current);

        fetch("http://127.0.0.1:8000/api/vagas", {
            method: "POST",
            body: JSON.stringify({
                id: id,
                txtVaga: texto,
                isEnabled: true
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(r => console.log(r));
      }
};
