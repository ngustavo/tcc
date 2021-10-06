import { readonly } from 'vue';
import { io } from 'socket.io-client';
import store from '@/utils/store';

const socket = io('localhost:3000', { autoConnect: false });

window.sock = (...args) => {
  socket.emit(...args);
};

socket.onAny((e, ...args) => {
  console.log('WS:', e, args);
});

socket.on('disconnect', (reason) => {
  console.log('disconnected', reason);
  // window.location.reload(true);
});

socket.on('error', (data) => {
  store.actions.setError(data);
});

socket.on('journey:list', (data) => {
  store.actions.setJourneys(data);
});

socket.on('user:list:phases', (data) => {
  store.actions.setUsers(data);
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

socket.on('user:read', (data) => {
  store.actions.setUser(data);
});

socket.on('user:chat:message', (data) => {
  store.actions.addMessage(data);
});

socket.on('user:chat:joined', (data) => {
  store.actions.addMessage({ name: 'server', content: `${data} entrou!` });
});

socket.on('phase:create', (data) => {
  store.actions.addPhase(data);
});

socket.on('phase:list', (data) => {
  store.actions.setPhases(data);
});

socket.on('phase:list:full', (data) => {
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
          this.getUser();
          store.actions.addMessage({ name: 'server', content: 'Você entrou!' });
          console.log('connected', true);
          resolve(true);
        });
        socket.on('connect_error', (error) => {
          store.actions.setError(error);
          localStorage.removeItem('token');
          window.location.reload(true);
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
  getUser(id) {
    socket.emit('user:read', { id });
  },
  addPhase(data) {
    socket.emit('phase:create', data);
  },
  getPhases() {
    console.log(store.state.user);
    if (store.state.user.role) {
      socket.emit('phase:list:full');
    } else {
      socket.emit('phase:list');
    }
  },
  addJourney(data) {
    socket.emit('journey:create', data);
  },
  getJourneys() {
    socket.emit('journey:list');
  },
  getAllJourneys() {
    socket.emit('user:list:phases');
  },
  sendMessage(content) {
    socket.emit('user:chat:message', { content });
  },
};

export default { socket: readonly(socket), actions };
