<script setup>
import { reactive } from 'vue';
import store from '@/utils/store';
import ws from '@/utils/ws';

const user = reactive({
  name: '',
  password: '',
});

const send = () => {
  ws.actions.addUser(user);
  user.name = '';
  user.password = '';
};

const del = (id) => {
  ws.actions.delUser(id);
};

ws.actions.getUsers();
</script>

<template>
  <section>
    <div class="nes-container with-title is-dark is-rounded users">
      <p class="title">Usuários</p>
      <div v-for="(u,i) in store.state.users" :key="i" class="user">
        <div class="attributes">
          <p><span class="nes-text is-warning">Nome:</span> {{u.name}}</p>
          <p><span class="nes-text is-warning">Pontuação:</span> {{u.total}}</p>
        </div>
        <div class="leftbtn">
          <button type="button" class="nes-btn is-error" @click="del(u.id)">🗙</button>
        </div>
      </div>
    </div>
    <div>
      <div class="nes-container with-title is-dark is-rounded">
        <p class="title">Criar Usuário</p>
        <form @submit.prevent="send" class="inputs">
          <div class="nes-field">
            <label for="name">Nome</label>
            <input
              type="text"
              id="name"
              class="nes-input is-dark"
              placeholder="João"
              v-model="user.name"
            />
          </div>
          <div class="nes-field">
            <label for="password">Senha</label>
            <input
              type="password"
              id="password"
              class="nes-input is-dark"
              placeholder="s3nh4"
              v-model="user.password"
            />
          </div>
          <input type="submit" class="nes-btn is-success" value="Criar" />
        </form>
      </div>
      <div class="nes-container with-title is-dark is-rounded export">
        <p class="title">Exportar</p>
        <div class="inputs">
          <button type="button" class="nes-btn is-primary" @click="$emit('close')">
            Gerar CSV
          </button>
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
.users {
  flex: 1;
}
.user {
  background: #414549;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.attributes {
  margin: 10px;
}
.leftbtn {
  margin: 0 10px 0 auto;
}
.inputs {
  gap: 20px;
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  align-items: flex-end;
}
.nes-input {
  width: 300px;
}
.inputs .nes-btn {
  width: 300px;
}
.export {
  margin-top: 30px;
}
</style>
