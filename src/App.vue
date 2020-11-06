<template>
  <div id="app">
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

<style>
.content {
  width: 1200px;
  min-height: 600px;
  margin: 0 auto;
  background-color: #efefef;
  padding-bottom: 15px;
  padding-top: 20px;
  margin-bottom: -15px;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
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
