<template>
  <div class='footer'>
    <div class="footer-content">
      <ul>
        <li>
         <router-link :to="{ name: 'PrivacyPolicy' }" class='footer-text'><span class='footer-text'>Privacy Policy</span></router-link>
        </li>
        <li>
         <router-link :to="{ name: 'ToC' }"><span class='footer-text'>Terms & Conditions</span></router-link>
        </li>
        <li>
         <router-link :to="{ name: 'Contact' }"><span class='footer-text'>Contact</span></router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Footer'
  }
</script>

<style>
  .footer {
    background-color: rgb(10,42,84);
    height: 40px;
  }

  .footer-content {
    width: 1200px;
    margin: auto;
    height: 40px;
  }

  .footer-text {
    color: #efefef;
  }

  li {
    padding-top: 10px
  }
</style>
