<script setup>
import { useRouter } from 'vue-router';
import ws from '@/utils/ws';
import store from '@/utils/store';

const router = useRouter();

const logout = () => {
  ws.actions.disconnect();
  router.push('/login');
};
</script>

<template>
  <div class="nav">
    <div class="title">
      <i class="snes-jp-logo"></i>
      <div>Ditado de Imagens</div>
    </div>
    <div class="links">
      <span>
        <router-link to="/">Home</router-link> |
      </span>
      <span v-if="store.state.user.role">
        <router-link to="/journeys">Jornadas</router-link> |
        <router-link to="/users">Usuários</router-link> |
        <router-link to="/phases">Fases</router-link> |
      </span>
      <a href="javascript:void(0)" @click="logout">Sair</a>
    </div>
  </div>
</template>

<style scoped>
.nav {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin: 0 10px;
  margin-bottom: 30px;
}

.title {
  display: flex;
  align-items: flex-end;
  gap: 20px;
  font-size: 24px;
}

.links {
  float: right;
  /* font-size: 12px; */
}
</style>
