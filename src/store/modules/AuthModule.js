import 'es6-promise/auto'
import userService from '../../http/user-service';

const actions = {
  async login({ commit }, { data }) {
    let response = await userService.login(data);
    if(response.status === 200 && response && response.data && response.data.entity) {
      commit('login', response.data.entity);
      return response.data.entity;
    } else {
      throw new Error('Login failed');
    }
  },

  async register({}, { data }) {
    let response = await userService.register(data);
    if(!response || response.status !== 201) {
      throw new Error('Registration failed');
    }
  },

  async forgotPassword({}, { data }) {
    let response = await userService.forgotPassword(data);
    console.log(response)
    if(!response || response.status !== 200) {
      throw new Error('Reset password failed');
    }
  },

  async updatePassword({ getters }, { id, data }) {
    let response = await userService.updatePassword(id, data);
    if(!response || response.status !== 200) {
      throw new Error('update password failed');
    }
  },

  async logout({ commit }) {
    try {
      await userService.logout();
    } catch(e) {
      console.error(e)
    }

    commit('logout')
  }
}

const mutations = {
  login: (state, payload) => {
    state.jwt = payload.jwt;
    state.user = payload.user;
  },
  logout: (state) => {
    state.jwt = '';
    state.user = null;
  }
}

const state = {
  jwt: '',
  user: null
}

const getters = {
  getUser: state => state.user,
  getToken: state => state.jwt,
  isLoggedIn: state => state.user && state.user._id
}

export default {
  actions,
  mutations,
  state,
  getters
}
