<template>
  <div class='header'>
    <div class="header-content">
      <router-link to="/"><img src="@/assets/logo.png" class='logo'></router-link>

      <div class="menu">
        <router-link to="login" v-if="!isLoggedIn"><span class='login-button'>Login / Register</span></router-link>
        <span class='login-button' v-if="isLoggedIn" @click="logout">Logout</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Header',
    computed: {
      isLoggedIn: function() {
        return this.$store.getters.isLoggedIn;
      }
    },
    methods: {
      async logout() {
        try {
          localStorage.authtoken = '';
          localStorage.user = null;
          await this.$store.dispatch('logout')
          this.$router.push( '/' )
        } catch(e) {
          console.error(e)
        }
      }
    }
  }
</script>

<style>
  .header {
    background-color: rgb(10,42,84);
    height: 75px;
    z-index: 100;
  }

  .header-content {
    text-align: 'center';
    width: 1200px;
    height: 75px;
    margin: auto;
    position: relative;
  }

  .logo {
    height: 60px;
    margin-top: 10px;
    margin-left: 5px;
    float: left;
  }

  .menu {
    position: absolute;
    bottom: 5px;
    right: 5px;
  }

  .login-button {
      color: #efefef;
      cursor: pointer
  }

</style>
