<script setup>
import store from '@/utils/store';
</script>

<template>
  <div class="word">
    <div class="cat">
      <i class="nes-octocat animate"></i>
    </div>
    <div class="nes-balloon from-left nes-pointer is-dark">
      <p>Parabéns! Você concluiu!</p>
      <p>
        Sua pontuação:
        <span class="points">{{ store.state.game.points }}</span>
      </p>
    </div>
  </div>
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
}
.points {
  color: yellow;
}
</style>
