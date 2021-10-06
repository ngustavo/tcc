<script setup>
import { ref, computed } from 'vue';
import store from '@/utils/store';
import ws from '@/utils/ws';

const phase = computed(() => store.state.game.phase.def || {});
const answer = ref('');

const phaseImage = computed(() => `http://localhost:3000/api/phase/image/${phase.value.id}`);

const send = () => {
  const journey = {
    phaseId: phase.value.id,
    answer: answer.value,
  };
  ws.actions.addJourney(journey);
  answer.value = '';
};
</script>

<template>
  <div class="topbar">
    <div class="points">
      Total:
      <i class="nes-icon smaller coin"></i>
      <span class="nes-text is-warning">{{ store.state.user.total }}</span>
    </div>
    <div class="damage">
      Vale:
      <span class="nes-text is-error">{{ phase.points }}</span>
    </div>
  </div>
  <div class="hint">
    Dica:
    <span class="nes-text is-primary">{{ phase.hint }}</span>
  </div>
  <div class="frame">
    <img :src="phaseImage" alt="" />
  </div>
  <div class="footer">
    <form @submit.prevent="send" class="inputs">
      <div class="nes-field">
        <label for="dark_field">Resposta...</label>
        <input
          type="text"
          id="dark_field"
          class="nes-input is-dark"
          placeholder="digite e aperte enter"
          v-model="answer"
        />
      </div>
    </form>
  </div>
</template>

<style scoped>
.topbar {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}
.points {
  display: flex;
  align-items: center;
}
.smaller {
  margin: 0 5px;
  transform: scale(1);
}
.frame {
  width: 400px;
  height: 200px;
  margin: 20px;
  text-align: center;
}
img {
  height: 100%;
  object-fit: cover;
}
.footer form {
  display: flex;
  align-items: flex-end;
}
.nes-field {
  width: 500px;
}
</style>
