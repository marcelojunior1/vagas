
document.onkeydown = function(evt) {
    if (!evt.ctrlKey) {
      return;
    }

    const stringsBloqueadas = ["Candidatou-se", "Novo", "ex-alunos", "ex-aluno", "verification", "Visualizado", "Recrutando", "corresponde", "horas"]
    let lista = document.getElementsByClassName("entity-item search-item job-item")

    for (let i = 0; i < lista.length; i++) {
        let id  = lista[i].dataset.id;
        let array_texto = lista[i].children[2].innerText.split('\n')
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
