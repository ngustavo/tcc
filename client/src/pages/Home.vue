<script setup>
import Game from '@/views/Game.vue';
import Sidebar from '@/views/Sidebar.vue';
</script>

<template>
  <div class="home">
    <Game />
    <Sidebar />
  </div>
</template>

<style scoped>
.home {
  display: flex;
  height: 600px;
  justify-content: center;
  gap: 10px;
}
</style>
