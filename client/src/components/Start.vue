<script setup>
import store from '@/utils/store';
import ws from '@/utils/ws';

const start = () => {
  ws.actions.getPhases();
  store.actions.startGame();
};
</script>

<template>
  <div class="word">
    <div class="cat">
      <i class="nes-octocat animate"></i>
    </div>
    <p class="nes-balloon from-left nes-pointer is-dark">Vamos começar?</p>
  </div>
  <button @click="start" type="button" class="nes-btn is-success">
    Iniciar
  </button>
</template>

<style scoped>
.word {
  display: flex;
  align-items: flex-end;
  gap: 20px;
}
.cat {
  background: white;
  padding: 10px;
  border-radius: 10%;
}
.nes-balloon {
  width: 400px;
  height: 60px;
}
</style>
