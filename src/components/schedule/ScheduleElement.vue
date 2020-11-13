<template>
  <div class="schedule-obj">
    <div class="top-schedule">
      <div class="date">
        {{getDate(classObj.schedule.startDate)}} {{this.hasDuration ? `(${this.durationHour}h ${this.durationMinute}m)` : '' }}
      </div>
      <div class="martialArt">
        {{classObj.martialArt}}
      </div>
      <div class="attend-button-wrapper">
        <button @click="onAttend" class="attend-button">{{getAttending()}} {{translate('attending')}}</button>
        <div :class="displayOptions ? 'dropdown-content' : 'dropdown-content-inactive'">
          <div class="dropdown-element"  @click="attend(true)">{{translate('online')}}</div>
          <div class="dropdown-element"  @click="attend(false)">{{translate('inPerson')}}</div>
        </div>
      </div>
    </div>
      <div class="name">
        <router-link :to="'/classes/'+classObj._id" class="name-link">
          {{classObj.name}}
        </router-link>
      </div>

    <div class="name" v-if="classObj.location && classObj.location.address">
      <a :href="classObj.location.url">{{classObj.location.address}}</a>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

  export default {
    name: 'ScheduleElement',
    props: [
      'classObj',
      'isMember'
    ],
    data() {
      return {
        durationHour: 0,
        durationMinute: 0,
        hasDuration: false,
        displayOptions: false
      }
    },
    computed: {
      currentUser: function() {
        return this.$store.getters.getUser;
      }
    },
    methods: {
      getDate(date) {
        return moment(date).format('ddd, MMM DD HH:MM');
      },
      setDateDiff(startDate, endDate) {
        let duration = endDate.valueOf() && startDate.valueOf() ? endDate.valueOf() - startDate.valueOf() : 0;
        let timeDuration = moment.duration(duration);
        this.durationHour = timeDuration.hours();
        this.durationMinute = timeDuration.minutes();

        if(this.durationHour && this.durationHour > 0 || (this.durationMinute && this.durationMinute > 0)) {
          this.hasDuration = true;
        }
      },
      getAttending() {
        return this.classObj.attendees && this.classObj.attendees.length;
      },
      onAttend() {
        if(!this.currentUser) {
          this.$router.push( '/login' )
          return;
        }

        if(!this.isMember) {
          return;
        }

        if(this.isAttending()) {
          let data = {
            classId: this.classObj._id
          }
          this.unattend(data);
          return;
        }

        if(this.classObj.supportOnlineClasses) {
            this.displayOptions = !this.displayOptions;
        } else {
          this.attend(false)
        }
      },
      async attend(online = false) {
        this.$store.commit('isLoading', true);

        let params = {
          classId: this.classObj._id || this.classObj.parentId,
          startDate: this.classObj.schedule.startDate,
          endDate: this.classObj.schedule.endDate,
          online
        }

        await this.$store.dispatch('attend', { params })
        this.$store.commit('isLoading', false);

        this.displayOptions = false;
      },
      async unattend(params) {
        this.$store.commit('isLoading', true);
        await this.$store.dispatch('unattend', { params })
        this.$store.commit('isLoading', false);
      },
      isAttending() {
        return this.classObj.attendees && this.classObj.attendees.find(attendee => attendee.academyMember.member._id === this.currentUser._id)
      }
    },
    mounted() {
      let startDate = this.classObj.schedule && this.classObj.schedule.startDate;
      let endDate = this.classObj.schedule && this.classObj.schedule.endDate
      if(startDate && endDate) {
        this.setDateDiff(moment(startDate), moment(endDate));
      }
    }
  }
</script>

<style scoped>

.schedule-obj {
  padding-bottom: 30px;
  background-color: white;
  padding: 10px 10px 10px 10px;
  border-radius: 15px;
}

.top-schedule {
  display: grid;
  grid-template-columns: auto 200px;
  grid-template-rows: 20px 20px;
}

.date {
  text-align: left;
  grid-column: 1 / span 1;
}

.martialArt {
  text-align: left;
  font-size: 14px;
  color: #a8a8a8;
  padding-top: 5px;
  grid-column: 1 / span 1;
}

.attend-button-wrapper {
  grid-column: 2 / span 1;
  grid-row: 1 / span 2;
  text-align: right;
  position: relative;
}

.attend-button {
  height: 40px;
  border-radius: 20px;
  color: #efefef;
  cursor: pointer;
}

.name {
  text-align: left;
  padding-top: 15px;
  text-decoration: none;
}

.name-link {
  font-size: 20px;
  color: #2e2d2d;
  text-decoration: none;
}

.dropdown-content {
  display: block;
  background-color: rgb(10,42,84);
  color: #efefef;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  cursor: pointer;
  position: absolute;
  right: 0;
}

.dropdown-content-inactive {
  display: none;
}

.dropdown-element {
  padding: 8px 16px;
  text-align: center;
}

.dropdown-element:hover {
  background-color: #efefef;
  color: #2e2d2d;
}

a {
  color: #a8a8a8;
  font-size: 15px;
}
</style>
