<template>
  <div class="schedule-wrapper">
    <div class="datepicker-container" v-if="isLoggedIn">
      <Datepicker :value-attr="startDate" @value-changed="onStartDateChange" ></Datepicker>
      <Datepicker :value-attr="endDate" @value-changed="onEndDateChange"></Datepicker>
    </div>
    <div v-for="classObj in classes" :key="classObj._id">
      <ScheduleElement :classObj="classObj" :isMember="isMember" />
    </div>
    <div v-if="!(classes && classes.length)" class="noSchedule">
      {{translate('noSchedule')}}
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import ScheduleElement from '@/components/schedule/ScheduleElement'
import Datepicker from 'vue3-datepicker-lite'

  export default {
    name: 'Schedule',
    props: [
      'dataKey',
      'isMember',
      'academyId'
    ],
    components: {
      ScheduleElement,
      Datepicker
    },
    data() {
      return {
        startDate: moment().startOf('day').format('YYYY/MM/DD'),
        endDate: moment().add(7, 'days').endOf('day').format('YYYY/MM/DD')
      }
    },
    computed: {
      classes: function() {
        let classes = this.$store.getters.getClasses(this.dataKey) || [];
        classes.sort((a, b) => {
          return moment(a.schedule.startDate) - moment(b.schedule.startDate)
        });

        return classes;
      },
      classUpdated: function() {
        return this.$store.getters.classUpdated('list');
      },
      isLoggedIn: function() {
        return this.$store.getters.isLoggedIn;
      }
    },
    watch: {
      classUpdated: function (val) {
        this.getClasses();
      }
    },
    methods: {
      async getClasses() {
        this.$store.commit('isLoading', true);

        let classData = {
            academyId: this.academyId,
            startDate: this.startDate,
            endDate: this.endDate,
            timezone: moment.tz.guess()
        }

        await this.$store.dispatch('listClasses', { key: this.dataKey, params: classData });

        this.$store.commit('isLoading', false);
      },
      onStartDateChange(value) {
        this.startDate = value ? moment(value).format('YYYY/MM/DD') : this.startDate;
        this.getClasses();
      },
      onEndDateChange(value) {
        this.endDate = value ? moment(value).endOf('day').format('YYYY/MM/DD') : this.endDate;
        this.getClasses();
      }
    },
    mounted() {
      this.getClasses();
    }
  }
</script>

<style lang="scss">
.schedule-wrapper {
  display: grid;
  grid-template-rows: repeat(auto-fill);
  grid-row-gap: 10px;
  grid-column-gap: 10px;
}

.noSchedule {
  text-align: left;
  font-size: 18px;
  color: #a8a8a8;
}

.datepicker-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.picker__frame {
  width: 300px;
}

.picker__footer button {
  background-color: rgb(10,42,84) !important;
  height: 30px;
  width: 75px;
}

.datepicker-container input {
  background-color: white;
  border-radius: 5px;
  height: 30px;
  width: 120px;

  @include md {
    width: 200px;
  }

}

</style>
