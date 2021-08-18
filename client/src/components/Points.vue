<script setup>
import store from '@/utils/store';
</script>

<template>
    <div class="word">
      <div class="cat">
        <i class="nes-octocat animate"></i>
      </div>
      <p class="nes-balloon from-left nes-pointer is-dark">
        A resposta era:
        <label>SAPATO</label>
      </p>
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
</style>
