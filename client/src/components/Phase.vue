<script setup>
import store from '@/utils/store';
import Points from '@/components/Points.vue';
import Question from '@/components/Question.vue';
</script>

<template>
  <Question v-if="store.state.game.phase.status == 0" />
  <Points v-if="store.state.game.phase.status == 1" />
</template>

<style scoped>
</style>
