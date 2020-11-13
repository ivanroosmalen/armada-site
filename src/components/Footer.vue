<template>
  <div class='footer'>
    <div class="footer-content">
      <ul>
        <li>
         <router-link :to="{ name: 'PrivacyPolicy' }" class='footer-text'><span class='footer-text'>{{translate('privacyPolicy')}}</span></router-link>
        </li>
        <li>
         <router-link :to="{ name: 'ToC' }"><span class='footer-text'>{{translate('tac')}}</span></router-link>
        </li>
        <li>
         <router-link :to="{ name: 'Contact' }"><span class='footer-text'>{{translate('contact')}}</span></router-link>
        </li>
        <li>
         <span @click="setLanguage('en')" style="cursor: pointer"><img style="height: 20px; width: 28px" src='@/assets/us-flag.jpg' /></span>
        </li>
        <li>
         <span @click="setLanguage('pt')" style="cursor: pointer"><img style="height: 20px" src='@/assets/brazil-flag.png' /></span>
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
