import 'es6-promise/auto'
import classService from '../../http/class-service';

const actions = {
  async getClass({ commit }, { id, params }) {
    let response = await classService.get(id, params);
    if(response.status === 200 && response && response.data && response.data.entity) {
      commit('class', { key: id, data: response.data.entity });
      return response.data.entity;
    } else {
      throw new Error('Could not get class');
    }
  },
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
      commit('classUpdated', { key: response.data.entity._id });
    }

    return response;
  },
  async unattend({ commit }, { params }) {
    let response = await classService.unattend(params);
    if(response.status === 200) {
      commit('classUpdated', { key: response.data.entity._id });
    }
  },
  async batchUpdateAttendance({ commit }, { data }) {
    let response = await classService.batchUpdateAttendance(data);
    if(response.status === 200) {
      commit('classUpdated', { key: response.data.entity._id });
    }

    return response;
  }
}

const mutations = {
  classList: (state, payload) => {
    state.classList[payload.key] = payload.data;
  },
  class: (state, payload) => {
    state.class[payload.key] = payload.data;
  },
  classUpdated: (state, payload) => {
    state.classUpdated[payload.key] = !state.classUpdated[payload.key];
    state.classUpdated['list'] = !state.classUpdated['list'];
  },
}

const state = {
  class: {},
  classList: {},
  classUpdated: { list: false }
}

const getters = {
  getClass: state => key => state.class[key],
  getClasses: state => key => state.classList[key],
  classUpdated: state => key => state.classUpdated[key]
}

export default {
  actions,
  mutations,
  state,
  getters
}
