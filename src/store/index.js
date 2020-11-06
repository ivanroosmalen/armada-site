import AuthModule from './modules/AuthModule';
import { createStore } from 'vuex'

const Modules = {
  AuthModule
}

export default createStore({
    modules: Object.assign({},
      Modules
    )
})
