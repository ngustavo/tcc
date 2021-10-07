<script setup>
import store from '@/utils/store';
import ws from '@/utils/ws';

ws.actions.getPhases();
ws.actions.getAllJourneys();
</script>

<template>
  <section>
    <div class="nes-container with-title is-dark is-rounded journeys">
      <p class="title">Jornadas</p>
      <p v-if="!store.state.users.length">Nenhum usuário encontrado.</p>
      <div v-else class="table">
        <div v-for="(u,i) in store.state.users" :key="i" class="user">
          <div class="attributes user-attr">
            <p><span class="nes-text is-warning">Nome:</span> {{u.name}}</p>
            <p><span class="nes-text is-warning">Pontuação:</span> {{u.total}}</p>
          </div>
          <div class="phases">
            <p v-if="!u.Phases?.length">Ainda não iniciou.</p>
            <div v-else v-for="(p,j) in u.Phases" :key="j" class="attributes">
              <p><span class="nes-text is-warning">{{j+1}}.</span> {{p.name}}</p>
              <p><span class="nes-text is-warning">R:</span> {{p.Journey.answer}}</p>
            </div>
          </div>
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
  overflow: auto;
}
.journeys {
  flex: 1;
}
.phases {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin: 10px;
}
.user {
  background: #414549;
  margin: 10px;
  display: flex;
  align-items: center;
}
.user-attr {
  width: 200px;
  align-self: stretch;
  display: flex;
  flex-flow: column;
  justify-content: center;
}
.attributes {
  padding: 0 10px;
  background: #616569;
}
</style>
