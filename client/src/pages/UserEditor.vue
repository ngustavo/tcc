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

ws.actions.getUsers();
</script>

<template>
  <section>
    <div class="nes-container with-title is-dark is-rounded users">
      <p class="title">Usuários</p>
      <div v-for="(u,i) in store.state.users" :key="i">
        <p class="user">{{u.name}}</p>
        <p class="user">{{u.id}}</p>
      </div>
    </div>
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
