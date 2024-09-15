<template>
  <div class="container-fluid">
    <div class="mb-4 d-grid gap-2 d-flex justify-content-center">
      <button @click="atualizaTudo()" type="button" class="btn btn-sm btn-warning"> Atualizar tudo </button>
      <button type="button" class="me-2 btn btn-sm btn-danger"> Deletar tudo </button>
    </div>

    <div class="row spinner-border text-primary" role="status" v-show="!lista_pronta"></div>


    <div class="container-fluid">
      <div class="d-grid gap-2 col-12 col-sm-10 mx-auto" style="max-width: 720px;">

        <div class="row mb-4" v-for="vaga in vagas" :key="vaga._id">
            <div class="col-2 text-white align-content-start"> <p> {{ vaga.pred }}</p> </div>

            <div class="col-7 text-end">
              <a v-bind:href="'https://www.linkedin.com/jobs/view/' + vaga.vaga._id"
                 target="_blank"
                  style="text-decoration: none;"> {{vaga.vaga.txtVaga }}</a>
            </div>

            <div class="col-1 align-content-start">
              <div class="form-check form-switch align-content-center">
                <input v-model="vaga.vaga.isApplied" class="form-check-input" type="checkbox" >
              </div>
            </div>

            <div class="col-2 align-content-start">
              <button @click="atualizar(vaga.vaga._id)" type="button" class="btn btn-primary"> Atualizar </button>
            </div>
          </div>
      </div>
    </div>

    <ul id="lista" class="container-fluid" style="max-width: 800px; list-style-type: none">

    </ul>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: 'HomeView',
  components: {
  },
  data() {
    return {
      vagas: [],
      lista_pronta: false
    }
  },
  created() {
    axios.get("http://localhost:8000/api/vagas?infer=True&updated=False")
    .then(response => {
      this.vagas = response.data.data;
      this.lista_pronta = true;
    }).catch(err => {
      console.log("Erro: ")
      console.log(err);
    })
  },
  methods: {
    atualizaTudo() {
      for (let i in this.vagas) {
        let vaga = this.vagas[i].vaga;
        this.atualizar(vaga._id)
      }
    },

    atualizar(id) {
      let vaga = this.vagas.filter(v => v.vaga._id === id)[0]
      axios.put("http://localhost:8000/api/vagas/" + vaga.vaga._id, {
        isApplied: vaga.vaga.isApplied,
        isUpdated: true
      })
      .then(response => {
        console.log("Vaga Atualizada")
        console.log(response)
        this.vagas = this.vagas.filter(v => v.vaga._id !== id)
    }).catch(err => {
      console.log(err);
    })
    }
  }
}
</script>
