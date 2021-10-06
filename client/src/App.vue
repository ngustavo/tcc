<script setup>
import Navbar from '@/views/Navbar.vue';
import Toast from '@/components/Toast.vue';
import store from '@/utils/store';
import ws from '@/utils/ws';

ws.actions.connect();
</script>

<template>
  <section class="root">
    <Navbar />
    <router-view />
    <div v-if="store.state.error">
      <Toast
        @close="store.actions.setError('')">
        Erro: {{ store.state.error }}
      </Toast>
    </div>
  </section>
</template>

<style>
* {
  box-sizing: border-box;
}

@media (-webkit-min-device-pixel-ratio: 0) and (min-resolution: 0.001dpcm) {
  .nes-container.is-rounded.is-dark {
    border-image-repeat: initial;
  }
}

html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

p {
  margin-bottom: 0;
}

#app {
  font-family: PixelOperator, PressStart2P, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: black;
  color: #ddd;
  font-size: 1rem;
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
</style>
