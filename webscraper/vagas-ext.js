

// Executa apenas uma vez quando carregado

let lista = document.getElementsByClassName("search-list entity-lockup-list")[0].childNodes

for (let i in lista) {
    if (lista[i].attributes[4] !== undefined) {
        let id = lista[i].attributes[4].nodeValue
        let txtVaga = lista[i].childNodes[2].innerText.replace("Promovida", "\nPromovida")

        let tokens = txtVaga.split("\n")
        let titleTokens = tokens[0].split(" ")
        tokens.shift()
        tokens = titleTokens.concat(tokens)

        for (i in tokens) {
            tokens[i] = tokens[i].toLowerCase()
        }

        fetch("http://127.0.0.1:8000/api/vagas", {
            method: "POST",
            body: JSON.stringify({
                id: id,
                tokens: tokens
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
             }
        }).then(r => console.log(r));
    }
}
