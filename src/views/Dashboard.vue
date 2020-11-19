<template>
  <div class="academy-wrapper">
    <h1>{{translate('dashboard')}}</h1>
    <div class="no-data" v-if="!academy || !Object.keys(academy).length">
      {{translate('noDataJoinAcademy')}}:
      <a href="https://play.google.com/store/apps/details?id=com.armadama" >Android</a> / <a href="https://apps.apple.com/us/app/id1530706478" >ios</a>
    </div>
    <div class="academy-element" v-if="academy && Object.keys(academy).length">
      <img :src="academy.profileImg || defaultImg" class="img" />
      <div class="content-wrapper">
        <select v-model="academy" v-if="userAcademies && userAcademies.length" class="dashboard-select">
          <option :value="ua" v-for="(ua, index) in userAcademies" :key="index">
            {{ua.name}}
          </option>
        </select>
        <div class="academy-mas">
          <span v-for="ma in academy.martialArts">
            {{ma.name}}
          </span>
        </div>
        <div class="academy-website">
          {{translate('website')}}: <a :href="academy.website" > {{academy.website || '-'}} </a>
        </div>
        <div class="academy-locations">
          <h4>{{translate('locations')}}:</h4>
          <div v-for="location in academy.locations" :key="location._id">
            <a :href="location.url" > {{location.address}} </a>
          </div>
        </div>
      </div>
    </div>
    <div class="secondary-element" v-if="members.length">
      <div class="member-element">
        <h2>{{translate('instructors')}} {{instructors && instructors.length ? `(${instructors.length})` : ''}}</h2>
        <div>
          <MemberList :dataKey="academy._id" type="instructors"/>
        </div>
        <h2>{{translate('members')}} {{members && members.length ? `(${members.length})` : ''}}</h2>
        <div v-if="isMember">
          <MemberList :dataKey="academy._id" />
        </div>
      </div>
      <div class="schedule-element">
        <h2>{{translate('schedule')}}</h2>
        <div>
          <Schedule :dataKey="academy._id" :academyId="academy._id" :isMember="isMember" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import MemberList from '@/components/members/MemberList'
  import Schedule from '@/components/schedule/Schedule'
  import moment from 'moment-timezone'

  export default {
    name: 'Dashboard',
    components: {
      MemberList,
      Schedule
    },
    data() {
      return {
        defaultImg: 'https://armada-user-images.s3.amazonaws.com/default/profile.jpg',
        isMember: true,
        selectedAcademy: null
      }
    },
    computed: {
      currentUser: function() {
        return this.$store.getters.getUser;
      },
      userAcademies: function() {
        let userAcademies = (this.currentUser && this.$store.getters.getUserAcademies(this.currentUser._id)) || {};
        return userAcademies ? userAcademies.student : []
      },
      academy: {
        get() {
          return this.selectedAcademy || (this.userAcademies ? this.userAcademies[0] : {})
        },
        set(value) {
          this.selectedAcademy = value;
        }
      },
      members: function() {
        return (this.academy && this.$store.getters.getAcademyMembers(this.academy._id)) || [];
      },
      instructors: function() {
        return this.members && this.members.filter(member => member.isInstructor)
      }
    },
    watch: {
      academy: function (val) {
        if(val && val._id) {
          this.getRelatedData(val);
        }
      }
    },
    methods: {
      async getData() {
        this.$store.commit('isLoading', true);

        if(this.currentUser) {
          await Promise.all([
            this.$store.dispatch('getUserAcademies', { id: this.currentUser._id }),
          ]);
        }

        this.$store.commit('isLoading', false);
      },
      async getRelatedData(academy) {
        this.$store.commit('isLoading', true);

        await Promise.all([
          this.$store.dispatch('listAcademyMembers', { key: academy._id, params: { academyId: academy._id } })
        ]);

        this.$store.commit('isLoading', false);
      }
    },
    async mounted() {
      await this.getData();
    }
  }
</script>

<style scoped>
.no-data {
  text-align: center;
}

.img {
  width: 350px;
  height: 250px;
  object-fit: cover;
  border-radius: 10px;
  grid-column-start: 1;
  grid-column-end: 1;
  grid-row-start: 1;
  grid-row-end: 2;
}

.academy-wrapper {
  color: #2e2d2d;
}

.academy-element {
  grid-template-columns: 400px 1fr;
  display: grid;
}

.academy-name {
  font-size: 20px;
}

.academy-members {
  font-size: 15px;
}

.academy-website {
  font-size: 15px;
  padding-top: 5px;
}

.academy-locations {
  padding-top: 10px;
}

.academy-mas {
  margin: 10px 0 10px 0;
}

.content-wrapper {
  text-align: left;
  grid-column-start: 2;
  grid-column-end: 2;
}

.secondary-element {
  display: grid;
  grid-template-columns: 1fr 1fr;
  /* max-height: 600px;
  overflow-y: scroll; */
}

.dashboard-select {
  font-size: 25px;
  background-color: #efefef;
  color: #2e2d2d;
  border: none;
  cursor: pointer;
}

h2 {
  text-align: left;
  padding-left: 0;
}

a {
  color: rgb(10,42,84);
}
</style>
