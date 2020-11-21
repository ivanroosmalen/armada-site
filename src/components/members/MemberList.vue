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
      'type',
      'memberList'
    ],
    data() {
      return {
      }
    },
    computed: {
      members: function() {
        if(this.memberList) {
          return this.memberList;
        }

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

<style scoped lang="scss">

.member-list {
  display: grid;
  grid-row-gap: 10px;
  grid-column-gap: 10px;
  justify-items: center;

  grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
  @include sm {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  }

  @include md {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }
}

.member-element {
  width: 60px;
  height: 80px;

  @include sm {
    width: 80px;
    height: 100px;
  }

  @include md {
    width: 100px;
    height: 120px;
  }
}
</style>
