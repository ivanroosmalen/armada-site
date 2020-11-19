<template>
  <div class="attend-button-wrapper">
    <button @click="onAttend" class="attend-button">{{attending}} {{translate('attending')}}</button>
    <div :class="displayOptions ? 'dropdown-content' : 'dropdown-content-inactive'">
      <div class="dropdown-element"  @click="attend(true)">{{translate('online')}}</div>
      <div class="dropdown-element"  @click="attend(false)">{{translate('inPerson')}}</div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

  export default {
    name: 'AttendButton',
    props: [
      'classObj',
      'isMember',
      'startDate',
      'endDate',
      'changeRoute'
    ],
    data() {
      return {
        displayOptions: false
      }
    },
    computed: {
      currentUser: function() {
        return this.$store.getters.getUser;
      },
      attending: function() {
        return this.classObj.attendees && this.classObj.attendees.length;
      }
    },
    methods: {
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
          startDate: this.startDate || this.classObj.schedule.startDate,
          endDate: this.endDate || this.classObj.schedule.endDate,
          online
        }

        let response = await this.$store.dispatch('attend', { params })
        this.$store.commit('isLoading', false);

        this.displayOptions = false;

        if(this.changeRoute && params.classId !== response.data.entity._id) {
          this.$router.replace( '/classes/'+response.data.entity._id )
        }
      },
      async unattend(params) {
        this.$store.commit('isLoading', true);
        await this.$store.dispatch('unattend', { params })
        this.$store.commit('isLoading', false);
      },
      isAttending() {
        return this.classObj.attendees && this.classObj.attendees.find(attendee => attendee.academyMember.member._id === this.currentUser._id)
      }
    }
  }
</script>

<style scoped>

.attend-button-wrapper {
  grid-column: 2 / span 1;
  text-align: right;
  position: relative;
}

.attend-button {
  height: 40px;
  border-radius: 20px;
  color: #efefef;
  cursor: pointer;
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
