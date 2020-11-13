import 'es6-promise/auto'
import academyService from '../../http/academy-service';

const actions = {
  async listAcademies({ commit }, { key, data }) {
    let response = await academyService.list(data);
    if(response.status === 200 && response && response.data && response.data.entity) {
      commit('academyList', { key, data: response.data.entity });
      return response.data.entity;
    } else {
      throw new Error('Could not get academies');
    }
  },

  async getAcademy({ commit }, { id, params }) {
    let response = await academyService.get(id, params);
    if(response.status === 200 && response && response.data && response.data.entity) {
      commit('academy', { key: id, data: response.data.entity });
      return response.data.entity;
    } else {
      throw new Error('Could not get academy');
    }
  }
}

const mutations = {
  academyList: (state, payload) => {
    state.academyList[payload.key] = payload.data;
  },
  academy: (state, payload) => {
    state.academy[payload.key] = payload.data;
  }
}

const state = {
  academyList: {},
  academy: {}
}

const getters = {
  getAcademies: state => key => state.academyList[key],
  getAcademy: state => key => state.academy[key]
}

export default {
  actions,
  mutations,
  state,
  getters
}
