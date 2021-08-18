<script setup>
import Navbar from '@/views/Navbar.vue';
import store from '@/utils/store';
import ws from '@/utils/ws';

ws.actions.connect();
</script>

<template>
  <section class="root">
    <Navbar />
    <router-view />
    <div @click="store.actions.setError('')">
      <!-- <span v-if="store.state.error" class="error"
        >Erro: {{ store.state.error }}</span
      > -->
    </div>
  </section>
</template>

<style>
* {
  box-sizing: border-box;
}

html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

#app {
  font-family: PressStart2P, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: black;
  color: #ddd;
  font-size: 14px;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.root {
  display: flex;
  flex-flow: column;
  width: 1100px;
  margin: 0 auto;
  padding: 20px;
}

.error {
  margin: 10px;
  color: red;
}
.ok {
  color: yellowgreen;
}
</style>
