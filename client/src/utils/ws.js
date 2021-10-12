import { readonly } from 'vue';
import { io } from 'socket.io-client';
import store from '@/utils/store';

const socket = io('localhost:3000', { autoConnect: false });

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
  delUser(id) {
    socket.emit('user:del', { id });
  },
  addPhase(data) {
    socket.emit('phase:create', data);
  },
  getPhases() {
    socket.emit('phase:list');
  },
  delPhase(id) {
    socket.emit('phase:del', { id });
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

window.sock = (...args) => {
  socket.emit(...args);
};

socket.onAny((e, ...args) => {
  console.log('WS:', e, args);
});

socket.on('disconnect', (reason) => {
  console.log('disconnected', reason);
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
  if (store.state.user.id === data.userId) store.actions.addJourney(data);
  if (store.state.user.role > 0) actions.getAllJourneys();
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

socket.on('user:del', (data) => {
  store.actions.setUsers(data);
});

socket.on('user:chat:message', (data) => {
  store.actions.addMessage(data);
});

socket.on('user:chat:joined', (data) => {
  store.actions.addMessage({ name: 'server', content: `${data} entrou!` });
});

socket.on('phase:create', () => {
  actions.getPhases();
  actions.getJourneys();
});

socket.on('phase:list', (data) => {
  store.actions.setPhases(data);
});

socket.on('phase:del', (data) => {
  store.actions.setPhases(data);
});

export default { socket: readonly(socket), actions };
