<template>
  <div class='home'>
      <div class='welcome-container'>
        <h1>{{translate('welcome')}}</h1>
        <div>
          <p>
            {{translate('howToUse')}}
            <!-- Armada was created to help connect martial arts instructors with their members. -->
          </p>
          <p>
            {{translate('featureRequests')}} <span style="font-weight: bold">contact@armadama.com</span>
            <!-- For questions, comments or feature requests please contact contact@armada.com -->
          </p>
          <p style="padding-top: 30px;">
            {{translate('forFunctionalityDownload')}}
          </p>
          <p>
            <a href="https://play.google.com/store/apps/details?id=com.armadama" >Android</a> / <a href="https://apps.apple.com/us/app/id1530706478" >ios</a>
          </p>
        </div>
        <div v-if="!isLoggedIn" class="login-button-container">
          <router-link to="/login" class="menu-link" >
            <button class="login-button">{{translate('loginRegister')}}</button>
          </router-link>
        </div>
      </div>

      <div class='academies-container'>
        <h2>
          {{currentLocation ? translate('academiesNearYou') : translate('academies')}}
        </h2>
        <AcademyList v-bind:dataKey="key"/>
      </div>
  </div>
</template>

<script>
import AcademyList from '@/components/academies/AcademyList'

export default {
  name: 'Home',
  components: {
    AcademyList
  },
  data() {
    return {
      key: 'home'
    }
  },
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    async getAcademies() {
      this.$store.commit('isLoading', true);

      let data = {};
      try {
        let options = {
          enableHighAccuracy: true,
          timeout: 5000
        };

        data = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
           async position => {
             let data = {
               currentLat: position.coords.latitude,
               currentLng: position.coords.longitude
             }
             resolve(data);
           },
           error => {
             reject(error)
           },
           options
         )
        })

        if(data.currentLat) {
          this.currentLocation = true
        }
      } catch(e) {
      }

      try {
        data.currentLat = data.currentLat || 33.7700504;
        data.currentLng = data.currentLng || -118.1937395;
        await this.$store.dispatch('listAcademies', { key: this.key, data })
      } catch(e) {}

      this.$store.commit('isLoading', false);
    }
  },
  mounted() {
    this.getAcademies();
  }
}
</script>

<style>

.home {
  background-color: #efefef;
  color: #2e2d2d;
  text-align: left;
}

.welcome-container {
  text-align: center;
}

.academies-container {
  padding-top: 50px;
}

.login-button-container {
  padding-top: 50px;
}

.login-button {
  cusor: pointer;
}

h1, h2 {
  font-weight: normal;
}

h2 {
  padding-left: 20px;
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
  color: rgb(10,42,84);
}

p {
  margin-bottom: 0;
}
</style>
