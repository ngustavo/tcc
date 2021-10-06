<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import store from '@/utils/store';
import ws from '@/utils/ws';

const router = useRouter();
const user = reactive({
  name: '',
  password: '',
});

const send = async () => {
  const token = await store.actions.login(user);
  user.name = '';
  user.password = '';
  console.log('t', token);
  if (token) {
    const conn = await ws.actions.connect();
    console.log('push', conn);
    if (conn) {
      router.push('/');
    }
  }
};
</script>

<template>
  <section>
    <div class="nes-container with-title is-dark is-rounded">
      <p class="title">Login</p>
      <form @submit.prevent="send" class="inputs">
        <div class="nes-field is-inline">
          <label for="lo">Nome</label>
          <input
            type="text"
            autofocus
            id="lo"
            class="nes-input is-dark"
            placeholder="João"
            v-model="user.name"
          />
        </div>
        <div class="nes-field is-inline">
          <label for="pw">Senha</label>
          <input
            type="text"
            id="pw"
            class="nes-input is-dark"
            placeholder="s3nh4"
            v-model="user.password"
          />
        </div>
        <input type="submit" class="nes-btn is-success" value="Entrar" />
      </form>
    </div>
  </section>
</template>

<style scoped>
section {
  margin: 100px auto;
}
.inputs {
  gap: 20px;
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  align-items: flex-end;
}
.nes-input {
  min-width: 300px;
}
.nes-btn {
  width: 300px;
}
</style>
