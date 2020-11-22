<template>
  <div class='header'>
    <div class="header-content">
      <router-link to="/"><img src="@/assets/logo.png" class='logo'></router-link>

      <div class="desktop">
        <div :class="isLoggedIn ? 'menuLoggedIn' : 'menu'">
          <div class="nav-button-wrapper"><router-link to="/" class="menu-link" ><span class='nav-button'>{{translate('home')}}</span></router-link></div>
          <div class="nav-button-wrapper" v-if="isLoggedIn"><router-link to="/dashboard" class="menu-link" ><span class='nav-button'>{{translate('dashboard')}}</span></router-link></div>

          <div class="login-register-button" v-if="!isLoggedIn"><router-link to="/login" ><span class='login-button'>{{translate('loginRegister')}}</span></router-link></div>

          <span class='user-image' v-if="isLoggedIn" >
            <!-- <span class='alias'>{{user.alias || ''}}</span> -->
            <div class="img-wrapper">
              <img :src="user.thumbnailImg || this.defaultImg" class="thumbnail"/>
            </div>
            <div class="dropdown-content">
              <div class="dropdown-element login-button"  v-if="isLoggedIn" @click="onAccountClicked">{{translate('account')}}</div>
              <div class="dropdown-element login-button"  v-if="isLoggedIn" @click="logout">{{translate('logout')}}</div>
            </div>
          </span>
        </div>
      </div>

      <div class="non-desktop">
        <span :class="menuWrapperClicked ? 'menu-wrapper-clicked' : 'menu-wrapper'">
          <img src="@/assets/menu.png" class="hamburger" v-click-outside="closeMenu" @click="menuWrapperClicked = !menuWrapperClicked"/>
          <div class="dropdown-content">
            <router-link to="/" class="link" >
              <div class="dropdown-element login-button" >
                {{translate('home')}}
              </div>
            </router-link>

            <router-link to="/dashboard" class="link" v-if="isLoggedIn" >
              <div class="dropdown-element login-button" >
                {{translate('dashboard')}}
              </div>
            </router-link>

            <router-link to="/login" class="link" >
              <div class="dropdown-element login-button"  v-if="!isLoggedIn">
                {{translate('loginRegister')}}
              </div>
            </router-link>

            <div class="dropdown-element login-button"  v-if="isLoggedIn" @click="onAccountClicked">{{translate('account')}}</div>
            <div class="dropdown-element login-button"  v-if="isLoggedIn" @click="logout">{{translate('logout')}}</div>
          </div>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import ClickOutside from 'vue-click-outside'

  export default {
    name: 'Header',
    directives: {
      clickOutside: {
        beforeMount(el, binding) {
          el.clickOutsideEvent = function (event) {
            // here I check that click was outside the el and his children
            if (!(el == event.target || el.contains(event.target))) {
              binding.value();
            }
          };
          document.body.addEventListener('click', el.clickOutsideEvent)
        },
        unmounted(el){
          document.body.removeEventListener('click', el.clickOutsideEvent)
        }
      }
    },
    data() {
      return {
        defaultImg: 'https://user-images.armadama.com/default/thumbnail.jpg',
        menuWrapperClicked: false
      }
    },
    computed: {
      isLoggedIn: function() {
        return this.$store.getters.isLoggedIn;
      },
      user: function() {
        return this.$store.getters.getUser;
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
      },
      onAccountClicked() {
        this.$router.push( '/account' )
      },
      closeMenu() {
        this.menuWrapperClicked = false;
      }
    }
  }
</script>

<style lang="scss" scoped>

  .header {
    background-color: $primaryBackground;
    z-index: 100;

    height: 50px;
    @include lg {
        height: 75px;
    }
  }

  .header-content {
    text-align: 'center';
    margin: auto;
    position: relative;

    height: 50px;
    @include lg {
        height: 75px;
    }
  }

  .logo {
    float: left;

    height: 40px;
    margin-left: 5px;
    margin-top: 5px;

    @include lg {
        margin-top: 8px;
        height: 60px;
        margin-left: 50px;
    }
  }

  .menu {
    position: absolute;
    /* height: 30px; */
    /* top: 45px; */
    right: 50px;
    font-size: 18px;
    height: 100%;
  }

  .menuLoggedIn {
    position: absolute;
    /* height: 65px; */
    /* top: 30px; */
    right: 50px;
    font-size: 18px;
    height: 100%;
  }

  .desktop {
    display: none;
    @include lg {
        display: block;
    }
  }

  .non-desktop {
    display: block;
    @include lg {
        display: none;
    }

    .menu-wrapper-clicked .dropdown-content {
      display: block;
      margin-top: 50px;
      right: 0px;
    }
  }

  .hamburger {
    width: 35px;
    height: 35px;
    float: right;
    padding: 7px 10px 0 0;
    color: #efefef;
  }

  .link {
    text-decoration: none;
  }

  .login-button {
      color: #efefef;
      cursor: pointer;
      text-decoration: none;
  }

  .login-register-button {
    width: 160px;
    display: inline-block;
  }

  .menu-link {
    text-decoration: none;
  }

  .nav-button-wrapper {
    width: 120px;
    display: inline-block;
    /* border-style: solid; */
    /* border-width: 1px 1px 0px 1px; */
    /* border-color:  #a8a8a8; */
    padding-top: 30px;
    /* background-color: #efefef; */
    cursor: pointer;
    /* border-top-left-radius: 10px;
    border-top-right-radius: 10px; */
  }

  .nav-button-wrapper:hover {
    background-color: rgb(10,42,84);


  }

  .nav-button-wrapper:hover .nav-button {
    color: #efefef;
  }

  .nav-button-wrapper .nav-button {
    /* color: #2e2d2d; */
    color: #efefef;
    font-weight:500;
  }

  .user-image {
    position: relative;
    display: inline-block;
    padding-left: 40px;
    cursor: pointer;
  }

  .alias {
    color: #efefef;
    padding-right: 10px;
    font-size: 16px;
  }

  .img-wrapper {
    width: 50px;
    display: inline-block;
    padding-top: 13px;
  }

  .thumbnail {
    width: 50px;
    height: 50px;
    border-radius: 50px;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    background-color: rgb(10,42,84);
    color: #efefef;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    cursor: pointer;
    right: -50px;
  }

  .user-image:hover .dropdown-content {
    display: block;
  }

  .dropdown-element {
    padding: 8px 16px;
  }

  .dropdown-element:hover {
    background-color: #efefef;
    color: #2e2d2d;
  }
</style>
