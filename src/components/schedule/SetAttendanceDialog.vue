<template>
  <Modal v-model="value" max-width="500px">
    <div class="modal">
      <div v-for="member in members" :key="member._id" class="member-container">
        <div>
          <input type="checkbox"  @change="setAttendance($event.target.checked, member._id)" v-if="!!isChecked(member._id)" checked>
          <input type="checkbox"  @change="setAttendance($event.target.checked, member._id)" v-if="!isChecked(member._id)">
        </div>
        <div>
          {{translate('attending')}}
        </div>
        <div v-if="supportOnlineClasses">
          <input type="checkbox" @change="setOnline($event.target.checked, member._id)" v-if="!!isOnlineChecked(member._id)" checked>
          <input type="checkbox" @change="setOnline($event.target.checked, member._id)" v-if="!isOnlineChecked(member._id)" >
        </div>
        <div v-if="supportOnlineClasses">
          {{translate('online')}}
        </div>
        <div class="member">
          {{member.member.alias}}
        </div>
      </div>

      <div class="button-container">
        <button @click="submit()">
          {{translate('submit')}}
        </button>
      </div>
    </div>
  </Modal>
</template>

<script>
  import { Modal } from 'vue-neat-modal'
  import 'vue-neat-modal/dist/vue-neat-modal.css'

  export default {
    name: 'SetAttendanceDialog',
    components: {
      Modal
    },
    props: [
      'value',
      'closeModal',
      'academyId',
      'supportOnlineClasses',
      'classKey',
      'startDate',
      'endDate'
    ],
    data() {
      return {
        onlineIds: {},
        attendees: []
      }
    },
    computed: {
      members: function() {
        return this.$store.getters.getAcademyMembers(this.academyId) || [];
      },
      classObj: function() {
        let currentClass = this.$store.getters.getClass(this.classKey) || { schedule: {}};
        if(this.startDate && this.endDate && this.startDate !== currentClass.schedule.startDate && this.endDate !== currentClass.schedule.endDate) {
          currentClass.attendees = [];
        }
        return currentClass || {};
      },
      existingAttendees: function() {
        return this.classObj.attendees || [];
      }
    },
    watch: {
      existingAttendees: function (val) {
        this.attendees = val || []
      }
    },
    methods: {
      async submit() {
        this.$store.commit('isLoading', true)

        let data = {
            attendees: this.attendees,
            classId: this.classObj._id || this.classObj.parentId,
            startDate: this.startDate || this.classObj.schedule.startDate,
            endDate: this.endDate || this.classObj.schedule.endDate
        }
        let response = await this.$store.dispatch('batchUpdateAttendance', { data })
        this.$store.commit('isLoading', false)
        this.closeModal()

        if(data.classId !== response.data.entity._id) {
          this.$router.replace( '/classes/'+response.data.entity._id )
        }
      },
      setAttendance(checked, memberId) {
        if(checked) {
          let member = this.members.find(member => member._id === memberId)
          let existingAttendee = this.attendees.find(attendee => attendee.academyMember._id === memberId)
          if(!existingAttendee) {
            this.attendees.push({ academyMember: member, online: !!this.onlineIds[memberId] })
          }
        } else {
          this.attendees = this.attendees.filter(attendee => attendee.academyMember._id !== memberId)
        }
      },
      setOnline(checked, memberId) {
        this.onlineIds[memberId] = checked

        this.attendees.forEach(attendee => {
          if(attendee.academyMember._id === memberId) {
            attendee.online = checked
          }
        })
      },
      isChecked(memberId) {
        return this.classObj.attendees.find(attendee => attendee.academyMember._id === memberId)
      },
      isOnlineChecked(memberId) {
        return !!(this.classObj.attendees.find(attendee => attendee.academyMember._id === memberId) || {}).online
      }
    }
  }
</script>

<style scoped>
.modal {
  background-color: #efefef;
  color: #2e2d2d;
  padding: 10px 10px 10px 10px;
  border-radius: 10px;
}

.button-container {
  text-align: center;
  padding-top: 20px;
}

.member-container {
  display: grid;
  align-items: center;
  grid-template-columns: 40px 75px 40px 75px auto;
}

.member {
  font-size: 20px;
  font-weight: bold;
  padding-left: 20px;
}

input {
  width: 40px;
}

button {
  cursor: pointer;
  margin-bottom: 10px;
}

</style>
