<script setup>
import { reactive } from 'vue';
import store from '@/utils/store';
import ws from '@/utils/ws';

const phase = reactive({
  name: '',
  description: '',
  hint: '',
  points: '',
});

const send = () => {
  ws.actions.addPhase(phase);
  phase.name = '';
  phase.description = '';
  phase.hint = '';
  phase.points = '';
};

ws.actions.getPhases();
</script>

<template>
  <section>
    <div class="nes-container with-title is-dark is-rounded users">
      <p class="title">Fases</p>
      <div v-for="(p,i) in store.state.phases" :key="i">
        <p class="phase">{{p.name}}</p>
        <p class="phase">{{p.id}}</p>
      </div>
    </div>
    <div class="nes-container with-title is-dark is-rounded">
      <p class="title">Criar Fase</p>
      <form @submit.prevent="send" class="inputs">
        <div class="nes-field">
          <label for="name">Nome</label>
          <input
            type="text"
            id="name"
            class="nes-input is-dark"
            placeholder="sapato"
            v-model="phase.name"
          />
        </div>
        <div class="nes-field">
          <label for="description">Descrição</label>
          <input
            type="text"
            id="description"
            class="nes-input is-dark"
            placeholder="vestuário"
            v-model="phase.description"
          />
        </div>
        <div class="nes-field">
          <label for="hint">Dica</label>
          <input
            type="text"
            id="hint"
            class="nes-input is-dark"
            placeholder="usado nos pés"
            v-model="phase.hint"
          />
        </div>
        <div class="nes-field">
          <label for="points">Pontos</label>
          <input
            type="text"
            id="points"
            class="nes-input is-dark"
            placeholder="10"
            v-model="phase.points"
          />
        </div>
        <input type="submit" class="nes-btn is-success" value="Criar" />
      </form>
    </div>
  </section>
</template>

<style scoped>
section {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}
.inputs {
  gap: 20px;
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  align-items: flex-end;
}
.users {
  flex: 1;
}
.nes-input {
  width: 300px;
}
.nes-btn {
  width: 300px;
}
</style>
