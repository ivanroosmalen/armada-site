<template>
  <div>
    <div class='header'>
      <img src="./assets/armada-logo.png" style='height: 180px; margin-top: 10px'>
    </div>
    <h1>Welcome to Armada</h1>
    <p>
      Armada was created to help connect martial arts instructors with their members.
    </p>
    <p>
      For questions, comments or feature requests please contact contact@armada.com
    </p>

    <ul>
      <li>
       <router-link :to="{ name: 'PrivacyPolicy' }">Privacy Policy</router-link>
      </li>
      <li>
       <router-link :to="{ name: 'ToC' }">Terms & Conditions</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style>
.header {
  background-color: rgb(10,42,84);
  height: 200px
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
