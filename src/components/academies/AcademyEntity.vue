<template>
  <router-link :to="'/academies/'+academy._id" class="academy-wrapper">
    <img :src="academy.profileImg || defaultImg" class="img" />
    <div class="academy-name">{{academy.name}}</div>
    <div class="academy-members">{{translate('members')}}: {{academy.memberCount || 0}}</div>
  </router-link>
</template>

<script>
  export default {
    name: 'Academy',
    props: [
      'academy'
    ],
    data() {
      return {
        defaultImg: 'https://user-images.armadama.com/default/profile.jpg'
      }
    }
  }
</script>

<style scoped>
.img {
  width: 280px;
  height: 200px;
  object-fit: cover;
  border-radius: 10px
}

.academy-wrapper {
  cursor: pointer;
  color: #2e2d2d;
  text-decoration: none;
}

.academy-wrapper:hover {
  opacity: 0.5;
}

.academy-name {
  font-size: 20px;
}

.academy-members {
  font-size: 15px;
}
</style>
