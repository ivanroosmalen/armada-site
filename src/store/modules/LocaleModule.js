const mutations = {
  setLanguage: (state, language) => {
    state.language = language;
  }
}

const state = {
  language: 'en',
}

const getters = {
  getLanguage: state => state.language
}

export default {
  mutations,
  state,
  getters
}
