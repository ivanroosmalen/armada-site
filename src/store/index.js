import AppModule from './modules/AppModule';
import AcademyModule from './modules/AcademyModule';
import AcademyMemberModule from './modules/AcademyMemberModule';
import AuthModule from './modules/AuthModule';
import ClassModule from './modules/ClassModule';
import LocaleModule from './modules/LocaleModule';
import { createStore } from 'vuex'

const Modules = {
  AppModule,
  AcademyModule,
  AcademyMemberModule,
  AuthModule,
  ClassModule,
  LocaleModule
}

export default createStore({
    modules: Object.assign({},
      Modules
    )
})
