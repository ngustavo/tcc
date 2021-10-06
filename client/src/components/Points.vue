<script setup>
import store from '@/utils/store';
</script>

<template>
    <div class="word">
      <div class="cat">
        <i class="nes-octocat animate"></i>
      </div>
      <div class="nes-balloon from-left nes-pointer is-dark">
        <p>A resposta era:
          <span class="name">{{store.state.journeys[store.state.game.phase.count].name}}</span>
        </p>
        <p>Você ganhou:
          <span class="points">
            {{store.state.journeys[store.state.game.phase.count].points}} pontos
          </span>
        </p>
      </div>
    </div>
    <button
      @click="store.actions.passPhase()"
      type="button"
      class="nes-btn is-success"
    >
      Próxima
    </button>
</template>

<style scoped>
.word {
  display: flex;
  align-items: flex-end;
  gap: 20px;
}
.nes-balloon {
  width: 400px;
}
.cat {
  background: white;
  padding: 10px;
  border-radius: 10%;
}
.name {
  color: yellowgreen;
}
.points {
  color: orange;
}
</style>
