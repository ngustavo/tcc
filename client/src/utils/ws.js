import { readonly } from 'vue';
import { io } from 'socket.io-client';
import store from '@/utils/store';

const socket = io('localhost:3000', { autoConnect: false });

socket.onAny((e, ...args) => {
  console.log('SERVER:', e, args);
});

socket.prependAny((e, ...args) => {
  console.log('CLIENT:', e, args);
});

socket.on('disconnect', (reason) => {
  console.log('disconnected', reason);
});

socket.on('user:chat:message', (data) => {
  store.actions.addMessage(data);
});

socket.on('journey:list', (data) => {
  store.actions.setJourneys(data);
});

socket.on('journey:create', (data) => {
  store.actions.addJourney(data);
});

socket.on('user:create', (data) => {
  store.actions.addUser(data);
});

socket.on('user:list', (data) => {
  store.actions.setUsers(data);
});

socket.on('phase:create', (data) => {
  store.actions.addPhase(data);
});

socket.on('phase:list', (data) => {
  store.actions.setPhases(data);
});

const actions = {
  async connect() {
    const token = localStorage.getItem('token');
    if (token) {
      return new Promise((resolve, reject) => {
        socket.auth = { token };
        socket.connect();
        socket.on('connect', () => {
          store.actions.addMessage({ name: 'server', content: 'Você entrou!' });
          console.log('connected', true);
          resolve(true);
        });
        socket.on('connect_error', (error) => {
          store.actions.setError(error);
          localStorage.removeItem('token');
          console.log(error);
          reject(error);
        });
      });
    }
    return false;
  },
  disconnect() {
    socket.disconnect();
    localStorage.removeItem('token');
  },
  addUser(data) {
    socket.emit('user:create', data);
  },
  getUsers() {
    socket.emit('user:list');
  },
  addPhase(data) {
    socket.emit('phase:create', data);
  },
  getPhases() {
    socket.emit('phase:list');
  },
  addJourney(data) {
    socket.emit('journey:create', data);
  },
  sendMessage(data) {
    socket.emit('user:chat:message', data);
  },
};

export default { socket: readonly(socket), actions };
