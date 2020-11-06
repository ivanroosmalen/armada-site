<template>
  <div class='login'>
      <h1 v-if="state === 'login'">Login</h1>
      <h1 v-if="state === 'register'">Register</h1>
      <h1 v-if="state === 'forgotPw'">Forgot Password</h1>

      <form v-on:submit="submit" v-on:submit.prevent>
        <div v-if="state === 'login'">
          <div class="input">
            <input v-model="data.email" type="email" placeholder="Email">
          </div>
          <div class="input">
            <input v-model="data.password" type="password" placeholder="Password">
          </div>
          <div class="button-container">
            <div class="message">{{message}}</div>
            <div class="error">{{error}}</div>
            <button>Login</button>
          </div>
        </div>

        <div v-if="state === 'register'">
          <div class="input">
            <input v-model="data.alias" placeholder="Alias">
          </div>
          <div class="input">
            <input v-model="data.email" type="email" placeholder="Email">
          </div>

          <div class="button-container">
            <div class="message">{{message}}</div>
            <div class="error">{{error}}</div>
            <button>Register</button>
          </div>
        </div>

        <div v-if="state === 'forgotPw'">
          <div class="input">
            <input v-model="data.email" placeholder="Email">
          </div>

          <div class="button-container">
            <div class="message">{{message}}</div>
            <div class="error">{{error}}</div>
            <button>Reset password & send email</button>
          </div>
        </div>

        <br/>
        <div v-if="state === 'login'">
          <span @click="toRegister" class="state-button" >Register</span>
          <span @click="toForgotPw" class="state-button" >Forgot Password</span>
        </div>
        <div v-if="state === 'register'">
          <span @click="toLogin" class="state-button" >Login</span>
          <span @click="toForgotPw" class="state-button" >Forgot Password</span>
        </div>
        <div v-if="state === 'forgotPw'">
          <span @click="toLogin" class="state-button" >Login</span>
          <span @click="toRegister" class="state-button" >Register</span>
        </div>
      </form>
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
      message: ''
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
          let entity = await this.$store.dispatch('login', { data: this.data })
          localStorage.authtoken = entity.jwt;
          localStorage.user = JSON.stringify(entity.user);
          this.$router.push( '/' )
        } catch(e) {
          this.error = "Login failed. Make sure your email and password are correct"
        }
      } else if(this.state === 'register') {
        try {
          this.resetFields();

          if(!isEmail(this.data.email) || !this.data.alias) {
            this.error = "Please enter an alias and a valid email"
            return;
          }

          await this.$store.dispatch('register', { data: this.data })
          this.state = 'login'
          this.message = 'Please check your email for your new password'
        } catch(e) {
          this.error = "Registration failed"
        }
      } else if(this.state === 'forgotPw') {
        try {
          this.resetFields();
          if(!isEmail(this.data.email)) {
            this.error = "Please enter a valid email"
            return;
          }

          await this.$store.dispatch('forgotPassword', { data: this.data })
          this.state = 'login'
          this.message = 'Please check your email for your new password'
        } catch(e) {
          this.error = "Could not reset password. Please reach out or try again later"
        }
      }
    },
    resetFields() {
      this.message = '';
      this.error = '';
    }
  }
}
</script>

<style>

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

input {
  width: 200px
}

button {
  min-width: 150px
}

</style>
