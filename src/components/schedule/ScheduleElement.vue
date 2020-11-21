<template>
  <div class="schedule-obj">
    <div class="top-schedule">
      <div class="main-area">
        <router-link :to="{path: '/classes/'+classObj._id, query: { startDate: classObj.schedule.startDate, endDate: classObj.schedule.endDate }}" class="name-link">
          <div class="date">
            {{getDate(classObj.schedule.startDate, 'ddd, MMM DD HH:mm')}} {{this.hasDuration ? `(${this.durationHour}h ${this.durationMinute}m)` : '' }}
          </div>
          <div class="martialArt">
            {{classObj.martialArt}}
          </div>
          <div class="name">
            {{classObj.name}}
          </div>
        </router-link>
      </div>

      <AttendButton :classObj="classObj" :isMember="isMember" />
    </div>

    <div class="location" v-if="classObj.location && classObj.location.address">
      <a :href="classObj.location.url">{{classObj.location.address}}</a>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import AttendButton from '@/components/schedule/AttendButton'

  export default {
    name: 'ScheduleElement',
    components: {
      AttendButton
    },
    props: [
      'classObj',
      'isMember'
    ],
    data() {
      return {
        durationHour: 0,
        durationMinute: 0,
        hasDuration: false,
      }
    },
    computed: {
      currentUser: function() {
        return this.$store.getters.getUser;
      }
    },
    methods: {
      getDate(date, format) {
        return moment(date).format(format);
      },
      setDateDiff(startDate, endDate) {
        let duration = endDate.valueOf() && startDate.valueOf() ? endDate.valueOf() - startDate.valueOf() : 0;
        let timeDuration = moment.duration(duration);
        this.durationHour = timeDuration.hours();
        this.durationMinute = timeDuration.minutes();

        if(this.durationHour && this.durationHour > 0 || (this.durationMinute && this.durationMinute > 0)) {
          this.hasDuration = true;
        }
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

<style lang="scss" scoped>

.schedule-obj {
  padding-bottom: 30px;
  background-color: white;
  padding: 5px 5px 5px 5px;
  border-radius: 15px;

  @include md {
    padding: 10px 10px 10px 10px;
  }
}

.top-schedule {
  display: grid;
  grid-template-columns: auto 100px;

  @include md {
    grid-template-columns: auto 150px;
  }
}

.main-area {
  cursor: pointer;
  text-align: left;
}

.expandedArea {

}

.date {
  font-size: 15px;
  @include md {
      font-size: 18px;
  }
}

.martialArt {
  font-size: 14px;
  color: #a8a8a8;
  padding-top: 5px;
  font-style: italic;
}

.attend-button-wrapper {
  grid-column: 2 / span 1;
  text-align: right;
  position: relative;
}

.name {
  padding-top: 15px;
  text-decoration: none;
}

.name-link {
  font-size: 20px;
  color: #2e2d2d;
  text-decoration: none;
}

.location {
  padding-top: 15px;
  text-align: left;

  font-size: 12px;
  @include md {
      font-size: 15px;
  }
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
