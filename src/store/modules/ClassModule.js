import 'es6-promise/auto'
import classService from '../../http/class-service';

const actions = {
  async listClasses({ commit }, { key, params }) {
    let response = await classService.list(params);
    if(response.status === 200 && response && response.data && response.data.entity) {
      commit('classList', { key, data: response.data.entity });
      return response.data.entity;
    } else {
      throw new Error('Could not get classes');
    }
  },
  async attend({ commit }, { params }) {
    let response = await classService.attend(params);
    if(response.status === 200) {
      commit('classUpdated');
    }
  },
  async unattend({ commit }, { params }) {
    let response = await classService.unattend(params);
    if(response.status === 200) {
      commit('classUpdated');
    }
  }
}

const mutations = {
  classList: (state, payload) => {
    state.classList[payload.key] = payload.data;
  },
  classUpdated: (state) => {
    state.classUpdated = !state.classUpdated;
  },
}

const state = {
  classList: {},
  classUpdated: false
}

const getters = {
  getClasses: state => key => state.classList[key],
  classUpdated: state => state.classUpdated
}

export default {
  actions,
  mutations,
  state,
  getters
}
