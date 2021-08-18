import { reactive, readonly } from 'vue';

import http from '@/utils/http';

const state = reactive({
  error: '',
  game: {
    status: 0,
    phase: 0,
    points: 0,
  },
  user: {},
  users: [],
  journeys: [],
  phases: [],
  messages: [],
});

const actions = {
  setError(data) {
    state.error = data.message || data;
  },
  setUser(data) {
    state.user = data;
  },
  addUser(data) {
    state.users.push(data);
  },
  setUsers(data) {
    state.users = data;
  },
  addPhase(data) {
    state.phases.push(data);
  },
  setPhases(data) {
    state.phases = data;
  },
  addJourney(data) {
    state.journeys.push(data);
    this.passPhase();
  },
  setJourneys(data) {
    state.journeys = data;
  },
  addMessage(data) {
    state.messages.push(data);
  },
  startGame() {
    state.game.status = 1;
  },
  passPhase() {
    if (state.game.phase >= state.phases.length) {
      this.endGame();
    } else {
      state.game.phase += 1;
    }
  },
  endGame() {
    state.game.status = 2;
  },
  async login(data) {
    try {
      const { token } = await http.login(data);
      state.user.token = token;
      localStorage.setItem('token', token);
      return token;
    } catch (error) {
      state.error = error.message;
      return false;
    }
  },
};

export default { state: readonly(state), actions };
