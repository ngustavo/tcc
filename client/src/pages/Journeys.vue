<script setup>
import store from '@/utils/store';
import ws from '@/utils/ws';

const imgPath = 'http://localhost:3000/api/phase/image/';

ws.actions.getAllJourneys();
</script>

<template>
  <section>
    <div class="nes-container with-title is-dark is-rounded journeys">
      <p class="title">Jornadas</p>
      <p v-if="store.state.users.length == 0">Nenhum usuário encontrado.</p>
      <div class="phase">
        <div class="attributes">
          <p>Resultados</p>
        </div>
        <div v-for="(p,i) in store.state.phases" :key="i" class="frame">
          <img :src="imgPath + p.id" alt="" />
        </div>
        <!-- <div class="leftbtn">
          <button type="button" class="nes-btn is-error" @click="$emit('close')">🗙</button>
        </div> -->
      </div>
      <div v-for="(u,i) in store.state.users" :key="i" class="user">
        <div class="attributes">
          <p>Nome: {{u.name}}</p>
        </div>
        <div v-for="(p,i) in u.Phases" :key="i">
          <p>Fase: {{p.name}}</p>
          <p>Resposta: {{p.Journey.answer}}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}
.journeys {
  flex: 1;
}
.user, .phase {
  background: gray;
  margin: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.frame {
  width: 100px;
  height: 50px;
  margin: 10px;
  text-align: center;
  background: black;
}
.attributes {
  margin: 10px;
}
.leftbtn {
  margin: 0 10px 0 auto;
}
img {
  height: 100%;
  object-fit: cover;
}
.inputs {
  gap: 20px;
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  align-items: flex-end;
}
input[type='file'] {
  display: none
}
.img-name {
  color: orange;
  margin: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 250px;
}
.nes-input {
  width: 300px;
}
.inputs .nes-btn {
  width: 300px;
}
</style>
