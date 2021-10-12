import { reactive, readonly, computed } from 'vue';

import http from '@/utils/http';

const state = reactive({
  error: '',
  game: {
    status: 0,
    phase: {
      count: 0,
      status: 0,
      points: 0,
      def: null,
    },
  },
  user: {
    total: 0,
  },
  users: [],
  journeys: [],
  phases: [],
  messages: [],
});

const actions = {
  setError(data) {
    state.error = data.message || data;
    console.log('Erro: ', state.error);
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
    state.game.status = 0;
  },
  addJourney(data) {
    state.journeys.push(data);
    state.user.total = data.total;
    this.passQuestion();
  },
  setJourneys(data) {
    state.journeys = data;
    this.setPhase(state.journeys.length);
  },
  addMessage(data) {
    state.messages.push(data);
  },
  startGame() {
    state.game.status = 1;
    state.game.phase.def = computed(() => state.phases[state.game.phase.count]);
  },
  setPhase(index) {
    if (index !== undefined) {
      state.game.phase.count = index;
    } else {
      state.game.phase.count += 1;
    }
    if (state.phases.length < 1) {
      this.emptyGame();
    } else if (state.game.phase.count >= state.phases.length) {
      this.endGame();
    }
    console.log('set phase', state.phases.length, state.game.phase.count);
  },
  passQuestion() {
    console.log('pass question', state.game.phase, state.phases.length);
    state.game.phase.status = 1;
  },
  passPhase() {
    state.game.phase.status = 0;
    state.game.phase.points = 0;
    this.setPhase();
    console.log('pass phase', state.phases.length, state.game.phase);
  },
  emptyGame() {
    state.game.status = 3;
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
      this.setError(error.message);
      return false;
    }
  },
};

export default { state: readonly(state), actions };
