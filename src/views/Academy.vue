<template>
  <div class="academy-wrapper">
    <div class="academy-element">
      <img :src="academy.profileImg || defaultImg" class="img" />
      <div class="content-wrapper">
        <h1>{{academy.name}}</h1>
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
    <div class="secondary-element">
      <div class="member-element">
        <h2>{{translate('instructors')}} {{instructors && instructors.length ? `(${instructors.length})` : ''}}</h2>
        <div>
          <MemberList :dataKey="$route.params.id" type="instructors"/>
        </div>
        <h2>{{translate('members')}} {{members && members.length ? `(${members.length})` : ''}}</h2>
        <div v-if="isMember">
          <MemberList :dataKey="$route.params.id"/>
        </div>
      </div>
      <div class="schedule-element">
        <h2>{{translate('schedule')}}</h2>
        <div>
          <Schedule :dataKey="$route.params.id" :academyId="$route.params.id" :isMember="isMember" />
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
    name: 'Academy',
    components: {
      MemberList,
      Schedule
    },
    data() {
      return {
        defaultImg: 'https://user-images.armadama.com/default/profile.jpg',
        isMember: false
      }
    },
    computed: {
      academy: function() {
        return this.$store.getters.getAcademy(this.$route.params.id) || {};
      },
      members: function() {
        return this.$store.getters.getAcademyMembers(this.$route.params.id);
      },
      instructors: function() {
        return this.members && this.members.filter(member => member.isInstructor)
      },
      currentUser: function() {
        return this.$store.getters.getUser;
      }
    },
    methods: {
      async getData() {
        this.$store.commit('isLoading', true);

        await Promise.all([
          this.$store.dispatch('getAcademy', { id: this.$route.params.id }),
          this.$store.dispatch('listAcademyMembers', { key: this.$route.params.id, params: { academyId: this.$route.params.id } })
        ]);
        this.$store.commit('isLoading', false);
      },
      checkIfMember() {
        if(this.currentUser && this.members && this.members.length) {
          this.isMember = !!this.members.find(member => member.member._id === this.currentUser._id);
        }
      }
    },
    async mounted() {
      await this.getData();
      this.checkIfMember();
    }
  }
</script>

<style scoped lang="scss">
.img {
  width: 280px;
  height: 220px;
  object-fit: cover;
  border-radius: 10px;
  grid-column-start: 1;
  grid-column-end: 1;
  grid-row-start: 1;
  grid-row-end: 2;

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

h2 {
  padding-left: 0;

  text-align: center;
  @include md {
    text-align: left;
  }
}

h1 {

  text-align: center;
  @include md {
    text-align: left;
  }
}

a {
  color: #a8a8a8;
}
</style>
