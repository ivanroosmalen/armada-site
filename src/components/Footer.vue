<template>
  <div class='footer'>
    <div class="footer-content">
      <ul class="footer-list">
        <li>
         <router-link :to="{ name: 'PrivacyPolicy' }" class='footer-text'><span class='footer-text'>{{translate('privacyPolicy')}}</span></router-link>
        </li>
        <li>
         <router-link :to="{ name: 'ToC' }"><span class='footer-text'>{{translate('tac')}}</span></router-link>
        </li>
        <li>
         <router-link :to="{ name: 'Contact' }"><span class='footer-text'>{{translate('contact')}}</span></router-link>
        </li>
      </ul>
      <div>
         <span @click="setLanguage('en')" style="cursor: pointer"><img style="height: 20px; width: 28px" src='@/assets/us-flag.jpg' /></span>
         <span @click="setLanguage('pt')" style="cursor: pointer; padding-left: 10px;"><img style="height: 20px" src='@/assets/brazil-flag.png' /></span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Footer'
  }
</script>

<style lang="scss" scoped>
  .footer {
    background-color: rgb(10,42,84);
    min-height: 80px;
  }

  .footer-content {
    max-width: 1200px;
    margin: auto;
    min-height: 80px;
  }

  .footer-list {
  }

  .footer-text {
    color: #efefef;
    text-decoration: none;
  }

  li {
    padding: 10px 5px 0 5px;
    margin: 0;
  }

</style>
