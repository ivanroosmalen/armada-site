<template>
  <div class="academy-list">
    <div v-for="academy in academies" :key="academy._id" class="academy-element">
      <AcademyEntity :academy="academy"/>
    </div>
  </div>
</template>

<script>
  import AcademyEntity from '@/components/academies/AcademyEntity'

  export default {
    name: 'AcademyList',
    components: {
      AcademyEntity
    },
    props: [
      'dataKey'
    ],
    data() {
      return {
      }
    },
    computed: {
      academies: function() {
        return this.$store.getters.getAcademies(this.dataKey);
      }
    }
  }
</script>

<style scoped>

.academy-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  grid-row-gap: 10px;
  grid-column-gap: 10px;
  justify-items: center;
}

.academy-element {
  width: 280px;
  height: 260px;
}
</style>
