<template>
  <div class="member-list">
    <div v-for="member in members" :key="member._id + type" class="member-element">
      <MemberEntity :member="member"/>
    </div>
  </div>
</template>

<script>
  import MemberEntity from '@/components/members/MemberEntity'

  export default {
    name: 'MemberList',
    components: {
      MemberEntity
    },
    props: [
      'dataKey',
      'type'
    ],
    data() {
      return {
      }
    },
    computed: {
      members: function() {
        if(this.type === 'instructors') {
          let members = this.$store.getters.getAcademyMembers(this.dataKey) || [];
          return members.filter(member => member.isInstructor)
        } else {
          return this.$store.getters.getAcademyMembers(this.dataKey) || []
        }

      }
    }
  }
</script>

<style scoped>

.member-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  grid-row-gap: 10px;
  grid-column-gap: 10px;
  justify-items: center;
}

.member-element {
  width: 100px;
  height: 120px;
}
</style>
