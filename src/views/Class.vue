<template>
  <div class="class-wrapper">
    <div class="class-element">
      <div class="content-wrapper">
        <h1>{{classObj.name}}</h1>
        <div class="martial-art">
          {{classObj.martialArt}}
        </div>
        <div class="date">
          {{getStartDate()}} - {{getEndDate()}}
        </div>
        <div class="description">
          {{classObj.description}}
        </div>
        <div class="location" v-if="classObj && classObj.location">
          <a :href="classObj.location.url" > {{classObj.location.address}} </a>
        </div>

        <div class="attend-button" v-if="!currentMember.isOwner">
          <AttendButton :classObj="classObj" :startDate="startDate" :endDate="endDate" :isMember="!!currentMember" :changeRoute="true" :text="translate('attend')" />
        </div>
        <div class="attend-button" v-if="isOwner">
          <button class="setAttendance-button" @click="modalOpen = true">{{translate('setAttendance')}}</button>
        </div>
      </div>
    </div>
    <div class="secondary-element">
      <div class="member-element">
        <h3>{{translate('instructors')}} {{instructors.length ? `(${instructors.length})` : '(0)' }}</h3>
        <div>
          <MemberList :memberList="instructors"/>
        </div>
        <h3>{{translate('attending')}} {{attending && attending.length ? `(${attending.length})` : '(0)' }}</h3>
        <div v-if="!!currentMember">
          <MemberList :memberList="attending"/>
        </div>
        <h3>{{translate('attendingOnline')}} {{attendingOnline && attendingOnline.length ? `(${attendingOnline.length})` : '(0)'}}</h3>
        <div v-if="!!currentMember">
          <MemberList :memberList="attendingOnline"/>
        </div>
      </div>
    </div>

    <SetAttendanceDialog v-model="modalOpen" :closeModal="closeModal" :academyId="classObj.academyId" :supportOnlineClasses="classObj.supportOnlineClasses" :classKey="$route.params.id" :startDate="startDate" :endDate="endDate"/>
  </div>
</template>

<script>
  import MemberList from '@/components/members/MemberList'
  import AttendButton from '@/components/schedule/AttendButton'
  import SetAttendanceDialog from '@/components/schedule/SetAttendanceDialog'
  import moment from 'moment-timezone'

  export default {
    name: 'Class',
    components: {
      MemberList,
      AttendButton,
      SetAttendanceDialog
    },
    props: [
      'startDate',
      'endDate'
    ],
    data() {
      return {
        modalOpen: false
      }
    },
    computed: {
      classObj: function() {
        let currentClass = this.$store.getters.getClass(this.$route.params.id) || { schedule: {}};
        if(this.startDate && this.endDate && this.startDate !== currentClass.schedule.startDate && this.endDate !== currentClass.schedule.endDate) {
          currentClass.attendees = [];
        }

        return currentClass || {};
      },
      instructors: function() {
        return this.classObj.instructors ? this.classObj.instructors.map(inst => inst.academyMember) : [];
      },
      attending: function() {
        return this.classObj.attendees ? this.classObj.attendees.filter(attendee => !attendee.online).map(attendee => attendee.academyMember) : [];
      },
      attendingOnline: function() {
        return this.classObj.attendees ? this.classObj.attendees.filter(attendee => attendee.online).map(attendee => attendee.academyMember) : [];
      },
      members: function() {
        return this.$store.getters.getAcademyMembers(this.classObj.academyId) || [];
      },
      currentMember: function() {
        if(!(this.classObj && this.currentUser && this.members)) {
          return false;
        }
        return this.members && this.members.find(member => member.member._id === this.currentUser._id) || {}
      },
      isOwner: function() {
        return this.currentMember && this.currentMember.isOwner;
      },
      currentUser: function() {
        return this.$store.getters.getUser;
      },
      classUpdated: function() {
        return this.$store.getters.classUpdated(this.$route.params.id);
      }
    },
    watch: {
      classUpdated: function (val) {
        this.getData();
      }
    },
    methods: {
      async getData() {
        this.$store.commit('isLoading', true);

        await this.$store.dispatch('getClass', { id: this.$route.params.id });

        if(this.currentUser) {
          await this.$store.dispatch('listAcademyMembers', { key: this.classObj.academyId , params: { academyId: this.classObj.academyId } })
        }

        this.$store.commit('isLoading', false);
      },
      getStartDate() {
        if(this.startDate) {
          return moment(this.startDate).format('DD MMM HH:mm')
        }
        if(this.classObj && this.classObj.schedule && this.classObj.schedule.startDate) {
          return moment(this.classObj.schedule.startDate).format('DD MMM HH:mm')
        }
      },
      getEndDate() {
        if(this.endDate) {
          return moment(this.endDate).format('DD MMM HH:mm')
        }
        if(this.classObj && this.classObj.schedule && this.classObj.schedule.endDate) {
          return moment(this.classObj.schedule.endDate).format('DD MMM HH:mm')
        }
      },
      closeModal() {
        this.modalOpen = false;
      }
    },
    async mounted() {
      await this.getData();
    }
  }
</script>

<style scoped lang="scss">
.class-wrapper {
  color: #2e2d2d;
  display: grid;
  grid-template-rows: auto auto;
  grid-gap: 20px;

  @include md {
    grid-template-columns: auto 400px;
    grid-gap: 20px;
  }
}

.class-element {
}

.content-wrapper {
  text-align: left;
  grid-column-start: 2;
  grid-column-end: 2;
}

.date {
  color: #a8a8a8;
  padding-top: 5px;
}

.description {
  font-size: 20px;
  padding-top: 20px;
}

.location {
  padding-top: 40px;
}

.martial-art {
  font-size: 18px;
  color: #a8a8a8;
  font-style:italic;
}

.secondary-element {
  /* max-height: 600px;
  overflow-y: scroll; */
}

.attend-button {
  padding-top: 50px;
  text-align: center;
  @include md {
    text-align: left;
  }
}

.setAttendance-button {
  height: 40px;
  border-radius: 20px;
  color: #efefef;
  cursor: pointer;

}

h3 {
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
