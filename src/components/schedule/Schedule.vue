<template>
  <div class="schedule-wrapper">
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

  export default {
    name: 'Schedule',
    props: [
      'dataKey',
      'isMember'
    ],
    components: {
      ScheduleElement
    },
    data() {
      return {

      }
    },
    computed: {
      classes: function() {
        let classes = this.$store.getters.getClasses(this.dataKey) || [];
        classes.sort((a, b) => {
          return moment(a.schedule.startDate) - moment(b.schedule.startDate)
        });

        return classes;
      }
    }
  }
</script>

<style scoped>
.schedule-wrapper {
  display: grid;
  grid-template-rows: repeat(auto-fill);
  grid-row-gap: 10px;
  grid-column-gap: 10px;
  margin-right: 10px;
}

.noSchedule {
  text-align: left;
  font-size: 18px;
  color: #a8a8a8;
}

</style>
