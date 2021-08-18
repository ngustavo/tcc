<script setup>
import { ref, watch } from 'vue';
import store from '@/utils/store';
import ws from '@/utils/ws';

const message = ref('');
const chatbox = ref(null);

const send = () => {
  ws.actions.sendMessage(message.value);
  message.value = '';
};

watch(store.state.messages, () => {
  chatbox.value.scrollTop = chatbox.value.scrollHeight;
});
</script>

<template>
  <div class="chatbox" ref="chatbox">
    <div
      v-for="m in store.state.messages"
      :key="m"
      class="message"
      :class="m.name == 'server' ? 'server' : ''"
    >
      <span v-if="m.name != 'server'" class="user">{{ m.name }}</span>
      <span class="content">{{ m.content }}</span>
    </div>
  </div>
  <div class="footer">
    <form @submit.prevent="send" class="login">
      <input
        v-model="message"
        type="text"
        class="nes-input is-dark"
        placeholder="digite e aperte enter"
      />
    </form>
  </div>
</template>

<style scoped>
input {
  font-size: 12px;
}
.chatbox {
  height: calc(100% - 90px);
  margin-bottom: 20px;
  overflow: hidden;
  overflow-y: auto;
}
.title {
  margin-top: -1.2rem;
}
.message {
  display: block;
  font-size: 12px;
  overflow-wrap: break-word;
}
.server {
  color: greenyellow;
}
.user {
  margin-right: 10px;
  color: orange;
}
</style>
