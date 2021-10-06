<script setup>
import Start from '@/components/Start.vue';
import Phase from '@/components/Phase.vue';
import End from '@/components/End.vue';
import store from '@/utils/store';
import ws from '@/utils/ws';

ws.actions.getPhases();
ws.actions.getJourneys();
</script>

<template>
  <section class="nes-container with-title is-dark is-rounded">
      <p class="title" v-if="store.state.game.status == 0">Início</p>
      <p class="title" v-if="store.state.game.status == 1">
        Fase {{store.state.game.phase.count+1}}
      </p>
      <p class="title" v-if="store.state.game.status == 2">Fim</p>
      <p class="title" v-if="store.state.game.status == 3">Indefinido</p>
      <div class="stage">
        <Start v-if="store.state.game.status == 0" />
        <Phase v-if="store.state.game.status == 1" />
        <End v-if="store.state.game.status == 2" />
        <End v-if="store.state.game.status == 3" />
      </div>
  </section>
</template>

<style scoped>
section {
  flex: 1;
}
.stage {
  height: calc(100% - 20px);
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-around;
}
</style>
