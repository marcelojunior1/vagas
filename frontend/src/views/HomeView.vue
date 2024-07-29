<template>
  <div class="container-fluid">
    <ul id="lista" class="container-fluid" style="max-width: 800px; list-style-type: none">
    <li class="mb-4" v-for="vaga in vagas" :key="vaga._id">
      <div class="row container justify-content-center">

        <div class="col-1">
          <p> {{ vaga.pred }}</p>
        </div>

        <div class="col-7">
          <a v-bind:href="'https://www.linkedin.com/jobs/view/' + vaga.vaga._id"
             target="_blank"
              style="text-decoration: none;"> {{vaga.vaga.txtVaga }}</a>
        </div>

        <div class="col-1">
          <div class="form-check form-switch">
            <input v-model="vaga.vaga.isApplied" class="form-check-input" type="checkbox" >
          </div>
        </div>

        <div class="col-3">
          <div>
            <button @click="atualizar(vaga.vaga._id)" type="button" class="btn btn-primary"> Atualizar </button>
          </div>
      </div>
      </div>
      </li>
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
      vagas: []
    }
  },
  created() {
    axios.get("http://localhost:8000/api/vagas?infer=True&updated=False")
    .then(response => {
      this.vagas = response.data.data;
    }).catch(err => {
      console.log("Erro: ")
      console.log(err);
    })
  },
  methods: {
    atualizar(id) {
      let vaga = this.vagas.filter(v => v.vaga._id === id)[0]
      axios.put("http://localhost:8000/api/vagas/" + vaga.vaga._id, {
        isApplied: vaga.isApplied,
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
