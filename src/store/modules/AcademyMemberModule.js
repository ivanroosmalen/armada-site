import 'es6-promise/auto'
import academyMemberService from '../../http/academyMember-service';

const actions = {
  async listAcademyMembers({ commit }, { key, params }) {
    let response = await academyMemberService.list(params);
    if(response.status === 200 && response && response.data && response.data.entity) {
      commit('academyMemberList', { key, data: response.data.entity });
      return response.data.entity;
    } else {
      throw new Error('Could not get academy members');
    }
  }
}

const mutations = {
  academyMemberList: (state, payload) => {
    state.academyMemberList[payload.key] = payload.data;
  }
}

const state = {
  academyMemberList: {}
}

const getters = {
  getAcademyMembers: state => key => state.academyMemberList[key]
}

export default {
  actions,
  mutations,
  state,
  getters
}
