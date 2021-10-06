<script setup>
import { reactive } from 'vue';
import store from '@/utils/store';
import ws from '@/utils/ws';

const phase = reactive({
  name: '',
  hint: '',
  points: '',
  image: null,
});

const imgPath = 'http://localhost:3000/api/phase/image/';

const send = () => {
  ws.actions.addPhase(phase);
  phase.name = '';
  phase.hint = '';
  phase.points = '';
  phase.image = null;
};

const onFileChange = (e) => {
  const files = e.target.files || e.dataTransfer.files;
  if (!files.length) return;
  const max = 1 * 1024 * 1024;
  const [file] = files;
  if (file.size > max) {
    store.actions.setError('Arquivo muito grande! (Máx: 1 MB)');
    return;
  }
  phase.image = file;
  phase.mime = file.type;
};

ws.actions.getPhases();
</script>

<template>
  <section>
    <div class="nes-container with-title is-dark is-rounded phases">
      <p class="title">Fases</p>
      <p v-if="store.state.phases.length == 0">Nenhuma fase encontrada.</p>
      <div v-for="(p,i) in store.state.phases" :key="i" class="phase">
        <div class="frame">
          <img :src="imgPath + p.id" alt="" />
        </div>
        <div class="attributes">
          <p>Palavra: {{p.name}}</p>
          <p>Dica: {{p.hint}}</p>
          <p>Pontos: {{p.points}}</p>
        </div>
        <div class="leftbtn">
          <button type="button" class="nes-btn is-error" @click="$emit('close')">🗙</button>
        </div>
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
          <label for="hint">Dica</label>
          <input
            type="text"
            id="hint"
            class="nes-input is-dark"
            placeholder="vestuário"
            v-model="phase.hint"
          />
        </div>
        <div class="nes-field">
          <label for="points">Pontos</label>
          <input
            type="number"
            id="points"
            class="nes-input is-dark"
            placeholder="10"
            v-model="phase.points"
          />
        </div>
        <div class="nes-field">
          <label class="nes-btn">
            <span>Escolha a Imagem</span>
            <input
              type="file"
              id="image"
              class="nes-input is-dark"
              placeholder="10"
              @change="onFileChange"
            />
          </label>
          <div class="img-name">{{phase.image?.name}}</div>
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
.phases {
  flex: 1;
}
.phase {
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
