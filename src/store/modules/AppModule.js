const mutations = {
  isLoading: (state, isLoading) => {
    state.loading = isLoading;
  }
}

const state = {
  loading: false,
}

const getters = {
  isLoading: state => state.loading
}

export default {
  mutations,
  state,
  getters
}
