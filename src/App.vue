<template>
  <div id="app">
    <div :class="isLoading ? 'overlay' : 'overlay-off'">
      <div class="loader"></div>
    </div>
    <Header />
    <div class="content">
      <router-view></router-view>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default {
  name: 'app',
  components: {
    Header,
    Footer
  },
  computed: {
    isLoading: function() {
      return this.$store.getters.isLoading;
    }
  },
  mounted() {
    if(localStorage.authtoken) {
      let entity = {
        jwt: localStorage.authtoken,
        user: localStorage.user ? JSON.parse(localStorage.user) : null
      }

      this.$store.commit('login', entity)
    }
  }
}
</script>

<style scoped>
.content {
  width: 1200px;
  min-height: 600px;
  margin: 0 auto;
  background-color: #efefef;
  padding: 20px 20px 20px 15px;
  margin-bottom: -15px;
}

.overlay-off {
  display: none;
}

.overlay {
  position: fixed; /* Sit on top of the page content */
  display: block; /* Hidden by default */
  width: 100%; /* Full width (cover the whole page) */
  height: 100%; /* Full height (cover the whole page) */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5); /* Black background with opacity */
  z-index: 9999; /* Specify a stack order in case you're using a different order for other elements */
}

.loader {
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid rgb(10,42,84); /* Blue */
  border-radius: 50%;
  width: 80px;
  height: 80px;
  animation: spin 2s linear infinite;
  margin: 300px auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  background-color: #efefef;
}

body {
  margin: 0;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
