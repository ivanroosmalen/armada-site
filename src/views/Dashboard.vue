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
        <div class="select-wrapper">
          <select v-model="academy" v-if="userAcademies && userAcademies.length" class="dashboard-select">
            <option :value="ua" v-for="(ua, index) in userAcademies" :key="index">
              {{ua.name}}
            </option>
          </select>
        </div>
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
        defaultImg: 'https://user-images.armadama.com/default/profile.jpg',
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

        try {
          if(this.currentUser) {
            await Promise.all([
              this.$store.dispatch('getUserAcademies', { id: this.currentUser._id }),
            ]);
          }
        } catch(e) {
          console.error('Unable to get user academies', e)
        }

        this.$store.commit('isLoading', false);
      },
      async getRelatedData(academy) {
        this.$store.commit('isLoading', true);

        try {
          await Promise.all([
            this.$store.dispatch('listAcademyMembers', { key: academy._id, params: { academyId: academy._id } })
          ]);
        } catch(e) {
          console.error('Unable to get academy members', e)
        }

        this.$store.commit('isLoading', false);
      }
    },
    async mounted() {
      await this.getData();
    }
  }
</script>

<style lang="scss" scoped>
.no-data {
  text-align: center;
}

.img {
  width: 280px;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  grid-column-start: 1;
  grid-column-end: 1;
  grid-row-start: 1;
  grid-row-end: 1;
  justify-self: center;

  @include sm {
    width: 350px;
    height: 270px;
  }

  @include lg {
    justify-self: left;
  }
}

.academy-wrapper {
  color: #2e2d2d;
}

.academy-element {
  display: grid;

  grid-template-rows: auto auto;

  @include md {
      grid-template-columns: 400px 1fr;
  }
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

  grid-row-start: 2;
  grid-row-end: 2;

  @include md {
    grid-column-start: 2;
    grid-column-end: 2;

    grid-row-start: 1;
    grid-row-end: 1;
  }
}

.secondary-element {
  display: grid;

  grid-template-rows: auto;
  @include md {
    grid-template-columns: 1fr 1fr;
    grid-row-gap: 5px;
    grid-column-gap: 5px;
  }
}

.dashboard-select {
  font-size: 25px;
  background-color: #efefef;
  color: #2e2d2d;
  border: none;
  cursor: pointer;
}

.select-wrapper {
  text-align: center;

  @include md {
    text-align: left;
  }
}

h2 {
  padding-left: 0;

  text-align: center;
  @include md {
    text-align: left;
  }
}

a {
  color: rgb(10,42,84);
}
</style>
