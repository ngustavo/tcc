<script setup>
import { ref } from 'vue';
import Points from '@/components/Points.vue';
import Question from '@/components/Question.vue';

const answered = ref(false);

// const answer = () => {
//   answered.value = !answered.value;
// };
</script>

<template>
  <Question v-if="!answered" />
  <Points v-else />
</template>

<style scoped>
</style>
