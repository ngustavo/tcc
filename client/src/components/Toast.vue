<script setup>
import { ref, defineEmits } from 'vue';

defineEmits(['close']);
const isVisible = ref(true);
</script>

<template>
    <teleport to="#app">
        <section v-if="isVisible">
            <button type="button" class="nes-btn is-error" @click="$emit('close')">X</button>
            <span class="error"><slot></slot></span>
        </section>
    </teleport>
</template>

<style scoped>
section {
    position: absolute;
    bottom: 30px;
    left: 30px;
    color: orange;
}
.is-error {
  transform: scale(.8);
}
.error {
  margin: 10px;
  color: red;
}
.ok {
  color: yellowgreen;
}
</style>
