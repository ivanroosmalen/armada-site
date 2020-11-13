<template>
  <div class='login'>
    <div class="auth-container">
      <h1 v-if="state === 'login'">{{translate('login')}}</h1>
      <h1 v-if="state === 'register'">{{translate('register')}}</h1>
      <h1 v-if="state === 'forgotPw'">{{translate('forgotPassword')}}</h1>

      <form v-on:submit="submit" v-on:submit.prevent>
        <div v-if="state === 'login'">
          <div class="input">
            <input v-model="data.email" type="email" placeholder="email">
          </div>
          <div class="input">
            <input v-model="data.password" type="password" :placeholder="translate('password')">
          </div>
          <div class="button-container">
            <div class="message">{{message}}</div>
            <div class="error">{{error}}</div>
            <button>Login</button>
          </div>
        </div>

        <div v-if="state === 'register'">
          <div class="input">
            <input v-model="data.alias" :placeholder="translate('alias')">
          </div>
          <div class="input">
            <input v-model="data.email" type="email" placeholder="email">
          </div>

          <div style="margin-top: 20px">
            <router-link :to="{ name: 'PrivacyPolicy' }" ><span class='legal-text'>{{translate('privacyPolicy')}}</span></router-link>
            <router-link :to="{ name: 'ToC' }"><span class='legal-text'>{{translate('tac')}}</span></router-link>
          </div>

          <div style="margin-top: 20px;">
            <input type="checkbox" id="checkbox" class="checkbox" v-model="legalChecked"/>
            <span>
              {{translate('agree')}}
            </span>
          </div>

          <div class="button-container">
            <div class="message">{{message}}</div>
            <div class="error">{{error}}</div>
            <button>{{translate('register')}}</button>
          </div>
        </div>

        <div v-if="state === 'forgotPw'">
          <div class="input">
            <input v-model="data.email" placeholder="email">
          </div>

          <div class="button-container">
            <div class="message">{{message}}</div>
            <div class="error">{{error}}</div>
            <button>{{translate('submit')}}</button>
          </div>
        </div>

        <br/>
        <div v-if="state === 'login'">
          <span @click="toRegister" class="state-button" >{{translate('register')}}</span>
          <span @click="toForgotPw" class="state-button" >{{translate('forgotPassword')}}</span>
        </div>
        <div v-if="state === 'register'">
          <span @click="toLogin" class="state-button" >{{translate('login')}}</span>
          <span @click="toForgotPw" class="state-button" >{{translate('forgotPassword')}}</span>
        </div>
        <div v-if="state === 'forgotPw'">
          <span @click="toLogin" class="state-button" >{{translate('login')}}</span>
          <span @click="toRegister" class="state-button" >{{translate('register')}}</span>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import isEmail from 'validator/lib/isEmail';

export default {
  name: 'Login',
  data() {
    return {
      data: {
        email: '',
        password: '',
        alias: ''
      },
      error: '',
      state: 'login',
      message: '',
      legalChecked: false
    }
  },
  methods: {
    toLogin() {
      this.resetFields();
      this.state = 'login';
    },
    toRegister() {
      this.resetFields();
      this.state = 'register';
    },
    toForgotPw() {
      this.resetFields();
      this.state = 'forgotPw';
    },
    async submit() {
      if(this.state === 'login') {
        try {
          this.resetFields();

          this.$store.commit('isLoading', true);
          let entity = await this.$store.dispatch('login', { data: this.data })
          localStorage.authtoken = entity.jwt;
          localStorage.user = JSON.stringify(entity.user);
          this.$router.push( '/' )
        } catch(e) {
          this.error = this.translate('loginError')
        }

        this.$store.commit('isLoading', false);
      } else if(this.state === 'register') {
        try {
          if(!this.legalChecked) {
            this.error = "You must agree to the privacy policy and terms of service";
            return;
          }

          this.resetFields();

          if(!isEmail(this.data.email)) {
            this.error = this.translate('emailError')
            return;
          }

          if(!this.data.alias) {
            this.error = this.translate('aliasError')
            return;
          }

          this.$store.commit('isLoading', true);
          await this.$store.dispatch('register', { data: this.data })
          this.state = 'login'
          this.message = this.translate('checkEmail')
        } catch(e) {
          this.error = this.translate('registerError')
        }

        this.$store.commit('isLoading', false);
      } else if(this.state === 'forgotPw') {
        try {
          this.resetFields();
          if(!isEmail(this.data.email)) {
            this.error = this.translate('emailError')
            return;
          }

          this.$store.commit('isLoading', true);
          await this.$store.dispatch('forgotPassword', { data: this.data })
          this.state = 'login'
          this.message = this.translate('newPasswordEmail')
        } catch(e) {
          this.error = this.translate('unableUpdatePassword')
        }

        this.$store.commit('isLoading', false);
      }
    },
    resetFields() {
      this.message = '';
      this.error = '';
      this.legalChecked = false;
    }
  }
}
</script>

<style>

.auth-container {
  border-style: solid;
  border-width: 1px;
  border-radius: 10px;
  width: 500px;
  margin: auto;
  padding-bottom: 20px;
}

.button-container {
    margin-top: 20px;
}

.error {
  color: red;
  font-size: 20px;
}

.state-button {
  cursor: pointer;
  text-decoration: underline;
  padding-left: 20px;
  padding-right: 20px;
}

.input {
  margin-top: 10px
}

.message {
  font-size: 20px
}

.legal-text {
  color: black;
  padding-left: 20px;
  padding-right: 20px;
}

.checkbox {
  width: 30px
}

input {
  width: 200px;
  height: 25px;
  color: #2e2d2d;
  background-color: #f5f5f5;
  border-width: 1px;
}

button {
  min-width: 150px;
  background-color: rgb(10,42,84);
  color: #efefef;
  border: none;
  border-radius: 15px;
  height: 25px;
}

</style>
